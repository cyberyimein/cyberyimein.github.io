// 项目卡片 — 金属铭牌 + NASA 文档机械展开

(async function () {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    const placeholder = grid.querySelector('.project-card.empty');
    if (placeholder) placeholder.remove();

    let data = [];
    try {
        const res = await fetch('./assets/data/projects.json?cb=' + Date.now());
        data = await res.json();
    } catch (e) {
        console.warn('[projects] load failed', e);
    }

    function getFallbackChain() {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
        const activeLang = (window.I18N && I18N.state && I18N.state.lang) || stored || 'en-US';
        const chain = [activeLang, 'en-US', 'zh-CN'];
        return chain.filter((lang, idx) => chain.indexOf(lang) === idx);
    }

    function pick(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        const chain = getFallbackChain();
        for (const k of chain) {
            if (obj && obj[k]) return obj[k];
        }
        const values = Object.values(obj || {});
        return values.find(Boolean) || '';
    }

    // 品牌 Logo SVG
    const WORM_SVG = '<svg viewBox="0 0 380 60" xmlns="http://www.w3.org/2000/svg" aria-label="CyberYimein"><text x="0" y="48" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="900" font-size="42" letter-spacing="6" fill="#FF3C00" style="text-transform:uppercase">CYBERYIMEIN</text></svg>';

    // 创建 NASA 文档 overlay（只创建一次）
    let overlay = document.querySelector('.project-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'project-overlay';
        overlay.innerHTML = `
            <div class="nasa-document">
                <button class="nasa-doc-close">CLOSE [X]</button>
                <div class="nasa-doc-masthead">
                    <div class="nasa-doc-logo">${WORM_SVG}</div>
                    <span class="masthead-label">News</span>
                </div>
                <div class="nasa-doc-org">
                    CyberYimein · Engineering Division<br>
                    AI Agent Research Center<br>
                    Tokyo, Japan
                </div>
                <div class="nasa-doc-rule"></div>
                <div class="nasa-doc-meta">
                    <div class="meta-left">
                        <div>CyberYimein</div>
                        <div>Research Center, Tokyo, Japan</div>
                    </div>
                    <div class="meta-right">
                        <div class="meta-for-release">For Release</div>
                        <div>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                </div>
                <div class="nasa-doc-release-no"></div>
                <div class="nasa-doc-title"></div>
                <div class="nasa-doc-body"></div>
                <div class="nasa-doc-signature">
                    <div class="sig-handwriting">CyberYimein</div>
                    <div class="sig-line"></div>
                    <div class="sig-name">CyberYimein</div>
                    <div class="sig-title">AI Agent Engineer<br>CyberYimein Engineering Division</div>
                </div>
                <div class="nasa-doc-end">-end-</div>
            </div>
        `;
        document.body.appendChild(overlay);

        // 关闭文档
        const closeBtn = overlay.querySelector('.nasa-doc-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDocument();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeDocument();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeDocument();
            }
        });
    }

    function openDocument(item) {
        const name = pick(item.name);
        const desc = pick(item.description || item.desc || '');
        const tags = (item.tags || []).map(t => typeof t === 'string' ? t : pick(t)).join(' / ');
        const tech = (item.tech || []).join(', ');
        const idx = data.indexOf(item);

        // Release number
        overlay.querySelector('.nasa-doc-release-no').textContent =
            'RELEASE NO:  CYBER-' + new Date().getFullYear().toString().slice(-2) + '-' + String(idx + 1).padStart(3, '0');

        // Fallback title from JSON (only if no md content)
        const titleEl = overlay.querySelector('.nasa-doc-title');
        if (titleEl) titleEl.textContent = item.content ? '' : name;

        // Update masthead label to match type
        const mastheadLabel = overlay.querySelector('.masthead-label');
        if (mastheadLabel) mastheadLabel.textContent = 'Projects';

        // Body — try markdown first, fallback to inline
        const body = overlay.querySelector('.nasa-doc-body');
        const fallbackHtml = `
            <p>${escapeHtml(desc)}</p>
            ${tech ? `<p><strong>TECHNICAL SPECIFICATIONS:</strong> ${escapeHtml(tech)}</p>` : ''}
            ${tags ? `<p><strong>CLASSIFICATION TAGS:</strong> ${escapeHtml(tags)}</p>` : ''}
            <p><strong>STATUS:</strong> ${escapeHtml(item.status || 'OPERATIONAL').toUpperCase()}</p>
            ${item.createdAt ? `<p><strong>DATE OF COMMISSION:</strong> ${escapeHtml(item.createdAt)}</p>` : ''}
        `;
        body.innerHTML = fallbackHtml;

        if (item.content && window.MD) {
            MD.fetch(item.content).then(md => {
                if (!md) return;
                const parsed = MD.parse(md);
                if (parsed.title && titleEl) titleEl.textContent = parsed.title;
                if (parsed.html) body.innerHTML = parsed.html;
            });
        }

        // 触发展开动画
        requestAnimationFrame(() => {
            const doc = overlay.querySelector('.nasa-document');
            if (doc) doc.classList.remove('nasa-doc-classified');
            overlay.classList.add('active');
        });
    }

    function closeDocument() {
        overlay.classList.remove('active');
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function createCard(item, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.tabIndex = 0;

        // 金属铭牌
        const nameplate = document.createElement('div');
        nameplate.className = 'card-nameplate';

        const title = document.createElement('h4');
        title.textContent = pick(item.name);
        nameplate.appendChild(title);

        const status = document.createElement('span');
        status.className = 'card-status';
        status.textContent = 'STATUS: OPERATIONAL';
        nameplate.appendChild(status);

        card.appendChild(nameplate);

        // 卡片正文
        const body = document.createElement('div');
        body.className = 'card-body';

        const desc = document.createElement('p');
        desc.textContent = pick(item.description || '');
        body.appendChild(desc);

        if (item.tags && item.tags.length) {
            const tagBar = document.createElement('div');
            tagBar.className = 'project-tags';
            item.tags.forEach(t => {
                if (!t) return;
                const label = typeof t === 'string' ? t : pick(t);
                const span = document.createElement('span');
                span.className = 'badge project-tag';
                span.textContent = label;
                tagBar.appendChild(span);
            });
            body.appendChild(tagBar);
        }

        card.appendChild(body);

        // 点击展开为 NASA 文档
        card.addEventListener('click', () => {
            card.classList.add('project-card-active');
            setTimeout(() => {
                card.classList.remove('project-card-active');
                openDocument(item);
            }, 150);
        });

        card.addEventListener('keypress', (evt) => {
            if (evt.key === 'Enter' || evt.key === ' ') {
                evt.preventDefault();
                card.click();
            }
        });

        return card;
    }

    function renderProjects() {
        grid.querySelectorAll('.project-card').forEach(c => c.remove());
        if (!data.length) {
            renderEmpty();
            return;
        }
        const frag = document.createDocumentFragment();
        data.forEach((item, i) => {
            frag.appendChild(createCard(item, i));
        });
        grid.appendChild(frag);
    }

    renderProjects();

    document.addEventListener('languageChanged', () => {
        renderProjects();
    });

    function renderEmpty() {
        const card = document.createElement('div');
        card.className = 'project-card empty';
        const nameplate = document.createElement('div');
        nameplate.className = 'card-nameplate';
        const h4 = document.createElement('h4');
        h4.textContent = window.I18N ? I18N.t('projects.empty.title') : 'Coming Soon';
        nameplate.appendChild(h4);
        card.appendChild(nameplate);

        const body = document.createElement('div');
        body.className = 'card-body';
        const p = document.createElement('p');
        p.textContent = window.I18N ? I18N.t('projects.empty.desc') : 'Projects will appear here.';
        body.appendChild(p);
        const note = document.createElement('div');
        note.className = 'empty-note';
        note.textContent = 'placeholder';
        body.appendChild(note);
        card.appendChild(body);
        grid.appendChild(card);
    }
})();
