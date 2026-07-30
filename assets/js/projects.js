// 项目卡片 — 金属铭牌 + NASA 文档机械展开

(async function () {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    let resizeFrame = 0;

    const placeholder = grid.querySelector('.project-card.empty');
    if (placeholder) placeholder.remove();

    let data = [];
    try {
        const res = await fetch('./assets/data/projects.json');
        data = await res.json();
    } catch (e) {
        console.warn('[projects] load failed', e);
    }

    function ui(key, fallback) {
        return typeof I18N !== 'undefined' && I18N.t ? I18N.t(key, fallback) : (fallback || key);
    }

    function getFallbackChain() {
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
        const activeLang = (typeof I18N !== 'undefined' && I18N.state && I18N.state.lang) || stored || 'en-US';
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

    const STATUS_LABELS = {
        active: ['status.operational', 'OPERATIONAL'],
        completed: ['status.completed', 'COMPLETED'],
        aborted: ['status.suspended', 'SUSPENDED']
    };

    function getStatus(item) {
        return String(item && item.status || 'active').toLowerCase();
    }

    function getStatusLabel(item) {
        const status = getStatus(item);
        const entry = STATUS_LABELS[status];
        return entry ? ui(entry[0], entry[1]) : status.toUpperCase();
    }

    function orderForStack(items) {
        return items
            .map((item, index) => ({ item, index }))
            .sort((a, b) => {
                const aAborted = getStatus(a.item) === 'aborted' ? 0 : 1;
                const bAborted = getStatus(b.item) === 'aborted' ? 0 : 1;
                return aAborted - bAborted || a.index - b.index;
            })
            .map(entry => entry.item);
    }

    function getContentChain() {
        const primary = getFallbackChain()[0] || 'en-US';
        if (primary.startsWith('zh')) return ['cn', 'en', 'jp'];
        if (primary.startsWith('ja')) return ['jp', 'en', 'cn'];
        return ['en', 'cn', 'jp'];
    }

    function pickContentPath(content) {
        if (!content) return '';
        if (typeof content === 'string') return content;
        const chain = getContentChain();
        for (const key of chain) {
            if (content[key]) return content[key];
        }
        const values = Object.values(content || {});
        return values.find(Boolean) || '';
    }

    function parsePx(value, fallback) {
        const next = parseFloat(value);
        return Number.isFinite(next) ? next : fallback;
    }

    function getLayoutMetrics() {
        const styles = getComputedStyle(grid);
        return {
            cardWidth: parsePx(styles.getPropertyValue('--project-card-width'), 280),
            gap: parsePx(styles.getPropertyValue('--project-gap'), 24),
            stackOverlap: parsePx(styles.getPropertyValue('--project-stack-overlap'), 194)
        };
    }

    function calculateExpandedCount(totalItems) {
        if (totalItems <= 1) return totalItems;

        const availableWidth = grid.clientWidth;
        if (!availableWidth) return totalItems;

        const { cardWidth, gap, stackOverlap } = getLayoutMetrics();
        const stackedReveal = Math.max(40, cardWidth - stackOverlap);

        for (let expanded = totalItems; expanded >= 0; expanded -= 1) {
            const stacked = totalItems - expanded;
            let requiredWidth = 0;

            if (expanded > 0) {
                requiredWidth += expanded * cardWidth + Math.max(0, expanded - 1) * gap;
            }

            if (stacked > 0) {
                if (requiredWidth > 0) requiredWidth += gap;
                requiredWidth += cardWidth + Math.max(0, stacked - 1) * stackedReveal;
            }

            if (requiredWidth <= availableWidth) return expanded;
        }

        return 0;
    }

    function applyProjectLayout() {
        const cards = Array.from(grid.querySelectorAll('.project-card:not(.empty)'));
        if (!cards.length) {
            grid.classList.remove('has-stacked-projects');
            return;
        }

        const expandedCount = calculateExpandedCount(cards.length);
        const stackedCount = cards.length - expandedCount;
        grid.classList.toggle('has-stacked-projects', expandedCount < cards.length);

        cards.forEach((card, index) => {
            const isStacked = index < stackedCount;
            card.classList.toggle('project-card-expanded', !isStacked);
            card.classList.toggle('project-card-stacked', isStacked);
            card.classList.toggle('project-card-stack-start', isStacked && index === 0);
            card.style.zIndex = String(isStacked ? index + 1 : cards.length + index + 1);
        });
    }

    function scheduleProjectLayout() {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(applyProjectLayout);
    }

    // 品牌 Logo SVG
    const WORM_SVG = '<svg viewBox="0 0 380 60" xmlns="http://www.w3.org/2000/svg" aria-label="CyberYimein"><text x="0" y="48" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="900" font-size="42" letter-spacing="6" fill="#FF3C00" style="text-transform:uppercase">CYBERYIMEIN</text></svg>';

    // 创建 NASA 文档 overlay（只创建一次）
    let overlay = document.querySelector('.project-overlay');
    let activeDocumentItem = null;
    let documentRequestId = 0;
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'project-overlay';
        overlay.innerHTML = `
                <div class="nasa-document">
                    <div class="nasa-doc-actions">
                    <a class="nasa-doc-github nasa-doc-action" href="#" target="_blank" rel="noopener noreferrer" hidden></a>
                    <button class="nasa-doc-close nasa-doc-action" type="button"></button>
                </div>
                <div class="nasa-doc-masthead">
                    <div class="nasa-doc-logo">${WORM_SVG}</div>
                    <span class="masthead-label"></span>
                </div>
                <div class="nasa-doc-org">
                    <span class="org-line-1"></span><br>
                    <span class="org-line-2"></span><br>
                    <span class="org-line-3"></span>
                </div>
                <div class="nasa-doc-rule"></div>
                <div class="nasa-doc-meta">
                    <div class="meta-row"><span class="meta-brand"></span></div>
                    <div class="meta-row">
                        <span class="meta-room"></span>
                        <span class="meta-for-release"></span>
                    </div>
                    <div class="meta-row">
                        <span class="nasa-doc-release-no"></span>
                        <span class="meta-date"></span>
                    </div>
                </div>
                <div class="nasa-doc-title"></div>
                <div class="nasa-doc-body"></div>
                <div class="nasa-doc-signature">
                    <div class="sig-handwriting">CyberYimein</div>
                    <div class="sig-line"></div>
                    <div class="sig-title"></div>
                </div>
                <div class="nasa-doc-end"></div>
                <div class="nasa-doc-telemetry"></div>
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
        activeDocumentItem = item;
        overlay.dataset.documentOwner = 'projects';
        const requestId = ++documentRequestId;
        updateDocumentChrome();
        const name = pick(item.name);
        const desc = pick(item.description || item.desc || '');
        const tags = (item.tags || []).map(t => typeof t === 'string' ? t : pick(t)).join(' / ');
        const tech = (item.tech || []).join(', ');
        const idx = data.indexOf(item);
        const contentPath = pickContentPath(item.content);
        const githubUrl = item.repo || item.url || '';

        // Release number
        overlay.querySelector('.nasa-doc-release-no').textContent =
            ui('document.releaseNo', 'RELEASE NO:') + '  CYBER-' + new Date().getFullYear().toString().slice(-2) + '-' + String(idx + 1).padStart(3, '0');

        // Fallback title from JSON (only if no md content)
        const titleEl = overlay.querySelector('.nasa-doc-title');
        if (titleEl) titleEl.textContent = contentPath ? '' : name;

        // Update masthead label to match type
        const mastheadLabel = overlay.querySelector('.masthead-label');
        if (mastheadLabel) mastheadLabel.textContent = ui('document.masthead.projects', 'Projects');

        const githubBtn = overlay.querySelector('.nasa-doc-github');
        if (githubBtn) {
            if (githubUrl) {
                githubBtn.href = githubUrl;
                githubBtn.hidden = false;
            } else {
                githubBtn.removeAttribute('href');
                githubBtn.hidden = true;
            }
        }

        // Body — try markdown first, fallback to inline
        const body = overlay.querySelector('.nasa-doc-body');
        const fallbackHtml = `
            <p>${escapeHtml(desc)}</p>
            ${tech ? `<p><strong>${escapeHtml(ui('document.technical', 'TECHNICAL SPECIFICATIONS:'))}</strong> ${escapeHtml(tech)}</p>` : ''}
            ${tags ? `<p><strong>${escapeHtml(ui('document.tags', 'CLASSIFICATION TAGS:'))}</strong> ${escapeHtml(tags)}</p>` : ''}
            <p><strong>${escapeHtml(ui('document.status', 'STATUS:'))}</strong> ${escapeHtml(getStatusLabel(item))}</p>
            ${item.statusReason ? `<p><strong>${escapeHtml(ui('document.statusNote', 'STATUS NOTE:'))}</strong> ${escapeHtml(pick(item.statusReason))}</p>` : ''}
            ${item.createdAt ? `<p><strong>${escapeHtml(ui('document.commission', 'DATE OF COMMISSION:'))}</strong> ${escapeHtml(item.createdAt)}</p>` : ''}
        `;
        body.innerHTML = fallbackHtml;

        if (contentPath && window.MD) {
            MD.fetch(contentPath).then(md => {
                if (requestId !== documentRequestId) return;
                if (!md) return;
                const parsed = MD.parse(md);
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
        activeDocumentItem = null;
        documentRequestId += 1;
        delete overlay.dataset.documentOwner;
        overlay.classList.remove('active');
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function currentLang() {
        return (typeof I18N !== 'undefined' && I18N.state && I18N.state.lang) || 'en-US';
    }

    function updateDocumentChrome() {
        if (!overlay) return;
        const closeBtn = overlay.querySelector('.nasa-doc-close');
        if (closeBtn) closeBtn.textContent = ui('document.close', 'CLOSE [X]');
        const githubBtn = overlay.querySelector('.nasa-doc-github');
        if (githubBtn) githubBtn.textContent = ui('document.github', 'GitHub →');
        const masthead = overlay.querySelector('.masthead-label');
        if (masthead) masthead.textContent = ui('document.masthead.projects', 'PROJECTS');
        const setText = (selector, key, fallback) => {
            const el = overlay.querySelector(selector);
            if (el) el.textContent = ui(key, fallback);
        };
        setText('.org-line-1', 'document.organization', 'CyberYimein · Bug Manufacturing Unit');
        setText('.org-line-2', 'document.lab', 'Unpaid Prompt Engineering Lab');
        setText('.org-line-3', 'document.location', 'Tokyo, Japan');
        setText('.meta-brand', 'document.organization', 'CyberYimein · Bug Manufacturing Unit');
        setText('.meta-room', 'document.room', 'Vibe Room Floor 4, Tokyo, Japan');
        setText('.meta-for-release', 'document.forRelease', 'FOR RELEASE');
        setText('.meta-date', '', new Date().toLocaleDateString(currentLang(), { year: 'numeric', month: 'long', day: 'numeric' }));
        const signature = overlay.querySelector('.sig-title');
        if (signature) {
            signature.innerHTML = escapeHtml(ui('document.signature', 'AI Agent Engineer')) + '<br>'
                + escapeHtml(ui('document.unit', 'Bug Manufacturing Unit'));
        }
        setText('.nasa-doc-end', 'document.end', '-END-');
    }

    updateDocumentChrome();
    document.addEventListener('languageChanged', () => {
        updateDocumentChrome();
        if (activeDocumentItem && overlay.dataset.documentOwner === 'projects' && overlay.classList.contains('active')) {
            openDocument(activeDocumentItem);
        }
    });

    function createCard(item) {
        const card = document.createElement('div');
        card.className = 'project-card';
        const itemStatus = getStatus(item);
        card.classList.add('project-status-' + itemStatus);
        if (item.featured) card.classList.add('project-card-featured');
        card.tabIndex = 0;

        // 金属铭牌
        const nameplate = document.createElement('div');
        nameplate.className = 'card-nameplate';

        if (item.featured) {
            const pin = document.createElement('span');
            pin.className = 'stripe-pin';
            nameplate.appendChild(pin);
        }

        const title = document.createElement('h4');
        title.textContent = pick(item.name);
        nameplate.appendChild(title);

        const status = document.createElement('span');
        status.className = 'card-status';
        status.textContent = ui('document.status', 'STATUS:') + ' ' + getStatusLabel(item);
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
        orderForStack(data).forEach((item) => {
            frag.appendChild(createCard(item));
        });
        grid.appendChild(frag);
        scheduleProjectLayout();
    }

    renderProjects();

    if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(() => {
            scheduleProjectLayout();
        });
        observer.observe(grid);
    } else {
        window.addEventListener('resize', scheduleProjectLayout);
    }

    document.addEventListener('languageChanged', () => {
        renderProjects();
    });

    function renderEmpty() {
        const card = document.createElement('div');
        card.className = 'project-card empty';
        const nameplate = document.createElement('div');
        nameplate.className = 'card-nameplate';
        const h4 = document.createElement('h4');
        h4.textContent = typeof I18N !== 'undefined' ? I18N.t('projects.empty.title') : 'Coming Soon';
        nameplate.appendChild(h4);
        card.appendChild(nameplate);

        const body = document.createElement('div');
        body.className = 'card-body';
        const p = document.createElement('p');
        p.textContent = typeof I18N !== 'undefined' ? I18N.t('projects.empty.desc') : 'Projects will appear here.';
        body.appendChild(p);
        const note = document.createElement('div');
        note.className = 'empty-note';
        note.textContent = ui('projects.placeholder', 'Placeholder record');
        body.appendChild(note);
        card.appendChild(body);
        grid.appendChild(card);
        grid.classList.remove('has-stacked-projects');
    }
})();
