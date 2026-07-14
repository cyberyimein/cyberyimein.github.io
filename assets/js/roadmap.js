(function () {
    const FILE = './assets/data/roadmap.json';
    const state = { data: null, lang: 'zh-CN' };

    function resolveLang(obj) {
        if (!obj || typeof obj !== 'object') return '';
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
        const lang = (window.I18N && I18N.state && I18N.state.lang) || stored || state.lang || 'en-US';
        state.lang = lang;
        if (obj[lang]) return obj[lang];
        if (lang.startsWith('en') && obj['en-US']) return obj['en-US'];
        if (lang.startsWith('zh') && obj['zh-CN']) return obj['zh-CN'];
        if (lang.startsWith('ja') && obj['ja-JP']) return obj['ja-JP'];
        return Object.values(obj)[0] || '';
    }

    const TYPE_LABELS = {
        project:    { 'zh-CN': '项目', 'en-US': 'PROJECT', 'ja-JP': 'プロジェクト' },
        experiment: { 'zh-CN': '验证', 'en-US': 'EXPERIMENT', 'ja-JP': '実験' },
        classified: { 'zh-CN': '保密', 'en-US': 'CLASSIFIED', 'ja-JP': '機密' }
    };

    function escapeHtml(s) {
        const d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function getContentChain() {
        const lang = state.lang || 'en-US';
        if (lang.startsWith('zh')) return ['cn', 'en', 'jp'];
        if (lang.startsWith('ja')) return ['jp', 'en', 'cn'];
        return ['en', 'cn', 'jp'];
    }

    function resolveContentPath(content) {
        if (!content) return '';
        if (typeof content === 'string') return content;
        const chain = getContentChain();
        for (const key of chain) {
            if (content[key]) return content[key];
        }
        return Object.values(content).find(Boolean) || '';
    }

    function isDone(item) {
        return String(item && item.status || '').toLowerCase() === 'done';
    }

    function isAborted(item) {
        return String(item && item.status || '').toLowerCase() === 'aborted';
    }

    function getStatusLabel(item) {
        if (isDone(item)) return 'COMPLETED';
        if (isAborted(item)) {
            if (state.lang.startsWith('zh')) return '已中止 · 等待重启';
            if (state.lang.startsWith('ja')) return '中止 · 再始動待ち';
            return 'SUSPENDED · AWAITING RESTART';
        }
        return 'IN PROGRESS';
    }

    function getRoadmapItems() {
        if (!state.data) return [];
        if (Array.isArray(state.data.items)) return state.data.items;

        const currentItems = Array.isArray(state.data.current) ? state.data.current : [];
        const completedItems = Array.isArray(state.data.completed) ? state.data.completed : [];
        return [...currentItems, ...completedItems];
    }

    /* ========== A4 portrait file card ========== */
    function createFileCard(item) {
        const card = document.createElement('div');
        const done = isDone(item);
        const aborted = isAborted(item);
        card.className = 'file-card file-stacked';
        if (aborted) card.classList.add('file-aborted');
        if (item.featured) card.classList.add('file-featured');

        const type = item.type || 'project';
        const isClassified = type === 'classified';
        if (isClassified) card.classList.add('file-classified');
        const typeLabel = (TYPE_LABELS[type] || TYPE_LABELS.project)[state.lang] || type.toUpperCase();

        // --- Full card face (A4 layout) — always rendered, clipped when stacked ---
        const face = document.createElement('div');
        face.className = 'file-face';

        // Top: classification stripe
        const stripe = document.createElement('div');
        stripe.className = 'file-stripe';
        const stripeType = document.createElement('span');
        stripeType.className = 'stripe-type file-type-' + type;
        stripeType.textContent = typeLabel;
        stripe.appendChild(stripeType);
        const stripeVer = document.createElement('span');
        stripeVer.className = 'stripe-version';
        stripeVer.textContent = item.version;
        stripe.appendChild(stripeVer);
        if (item.featured) {
            const pin = document.createElement('span');
            pin.className = 'stripe-pin';
            stripe.appendChild(pin);
        }
        face.appendChild(stripe);

        // Title block
        const titleBlock = document.createElement('div');
        titleBlock.className = 'file-title-block';
        const title = document.createElement('h4');
        title.className = 'file-title';
        title.textContent = resolveLang(item.title);
        titleBlock.appendChild(title);
        face.appendChild(titleBlock);

        // Description
        const desc = document.createElement('p');
        desc.className = 'file-desc';
        if (isClassified) {
            desc.classList.add('redacted');
            desc.textContent = resolveLang(item.desc);
        } else {
            desc.textContent = resolveLang(item.desc);
        }
        face.appendChild(desc);

        // Mid section: progress or completion
        if (!done && !aborted && item.percent != null && !isClassified) {
            const progressWrap = document.createElement('div');
            progressWrap.className = 'file-progress-wrap';

            const pctLabel = document.createElement('span');
            pctLabel.className = 'file-pct';
            pctLabel.textContent = item.percent + '%';
            progressWrap.appendChild(pctLabel);

            const bar = document.createElement('div');
            bar.className = 'file-bar';
            const fill = document.createElement('div');
            fill.className = 'file-fill' + (item.status === 'done' ? ' done' : ' progress');
            fill.style.width = Math.max(0, Math.min(100, Number(item.percent) || 0)) + '%';
            bar.appendChild(fill);
            progressWrap.appendChild(bar);

            face.appendChild(progressWrap);
        }

        if (done && !isClassified) {
            const stamp = document.createElement('div');
            stamp.className = 'file-stamp-block';
            stamp.innerHTML = '<span class="stamp-check">✓</span> COMPLETED';
            face.appendChild(stamp);
        }

        if (aborted && !isClassified) {
            const stamp = document.createElement('div');
            stamp.className = 'file-stamp-block file-aborted-stamp';
            stamp.innerHTML = '<span class="stamp-check">Ⅱ</span> ' + escapeHtml(getStatusLabel(item));
            face.appendChild(stamp);
        }

        // Classified: redacted progress
        if (isClassified && !done) {
            const pWrap = document.createElement('div');
            pWrap.className = 'file-progress-wrap classified-progress';
            const pctLabel = document.createElement('span');
            pctLabel.className = 'file-pct';
            pctLabel.textContent = '██%';
            pWrap.appendChild(pctLabel);
            const bar = document.createElement('div');
            bar.className = 'file-bar redacted-bar';
            pWrap.appendChild(bar);
            face.appendChild(pWrap);
        }

        // Footer
        const footer = document.createElement('div');
        footer.className = 'file-footer';

        if (item.github && !isClassified) {
            const gh = document.createElement('a');
            gh.href = item.github;
            gh.target = '_blank';
            gh.rel = 'noopener noreferrer';
            gh.className = 'file-link';
            gh.textContent = 'GitHub →';
            gh.addEventListener('click', (e) => e.stopPropagation());
            footer.appendChild(gh);
        }

        const idLabel = document.createElement('span');
        idLabel.className = 'file-id';
        idLabel.textContent = isClassified
            ? '████-' + (item.id || '').toUpperCase()
            : (item.id || '').toUpperCase();
        footer.appendChild(idLabel);

        face.appendChild(footer);
        card.appendChild(face);

        // Click → open document (classified opens too, but with redacted overlay content)
        card.addEventListener('click', () => { openArchiveDoc(item); });

        return card;
    }

    /* ========== Open document overlay ========== */
    function openArchiveDoc(item) {
        let overlay = document.querySelector('.project-overlay');
        if (!overlay) return;

        const name = resolveLang(item.title);
        const desc = resolveLang(item.desc);
        const type = item.type || 'project';
        const isClassified = type === 'classified';
        const typeLabel = (TYPE_LABELS[type] || TYPE_LABELS.project)[state.lang] || type.toUpperCase();
        const contentPath = resolveContentPath(item.content);
        const githubUrl = !isClassified && item.github ? item.github : '';

        const releaseEl = overlay.querySelector('.nasa-doc-release-no');
        if (releaseEl) {
            releaseEl.textContent = isClassified
                ? 'RELEASE NO:  ████-██-████'
                : 'RELEASE NO:  CYBER-' + new Date().getFullYear().toString().slice(-2) + '-' + (item.id || '000').toUpperCase();
        }

        const titleEl = overlay.querySelector('.nasa-doc-title');
        if (titleEl) titleEl.textContent = contentPath ? '' : name;

        // Update masthead label to match type
        const mastheadLabel = overlay.querySelector('.masthead-label');
        if (mastheadLabel) {
            if (isClassified) mastheadLabel.textContent = 'Classified';
            else if (type === 'experiment') mastheadLabel.textContent = 'Experiment';
            else mastheadLabel.textContent = 'Projects';
        }

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

        const body = overlay.querySelector('.nasa-doc-body');
        if (body) {
            if (isClassified) {
                body.innerHTML = `
                    <p style="color:var(--orange);font-weight:700;letter-spacing:2px;">⬛ CLASSIFIED — ${escapeHtml(typeLabel)}</p>
                    <p>${escapeHtml(desc)}</p>
                    <p><strong>VERSION:</strong> ████</p>
                    <p><strong>STATUS:</strong> ██████████</p>
                    <p><strong>CLEARANCE:</strong> RESTRICTED</p>
                    <p style="margin-top:12px;color:var(--text-faint);font-style:italic;">
                    This document is classified under CyberYimein Internal Policy.
                    Details have been redacted in accordance with organizational security protocols.</p>
                `;
            } else {
                body.innerHTML = `
                    <p><strong>TYPE:</strong> ${escapeHtml(typeLabel)}</p>
                    <p>${escapeHtml(desc)}</p>
                    <p><strong>VERSION:</strong> ${escapeHtml(item.version || '—')}</p>
                    <p><strong>STATUS:</strong> ${escapeHtml(getStatusLabel(item))}</p>
                    ${item.statusReason ? `<p><strong>STATUS NOTE:</strong> ${escapeHtml(resolveLang(item.statusReason))}</p>` : ''}
                    ${item.percent != null ? `<p><strong>PROGRESS:</strong> ${item.percent}%</p>` : ''}
                    ${item.github ? `<p><strong>REPOSITORY:</strong> <a href="${escapeHtml(item.github)}" target="_blank" rel="noopener" style="color:var(--orange);text-decoration:none;font-weight:700;">${escapeHtml(item.github)}</a></p>` : ''}
                `;
            }

            if (contentPath && window.MD) {
                MD.fetch(contentPath).then(md => {
                    if (!md) return;
                    const parsed = MD.parse(md);
                    if (parsed.html) {
                        const prefix = isClassified
                            ? '<p style="color:var(--orange);font-weight:700;letter-spacing:2px;">⬛ CLASSIFIED — ' + escapeHtml(typeLabel) + '</p>'
                            : '';
                        body.innerHTML = prefix + parsed.html;
                    }
                });
            }
        }

        requestAnimationFrame(() => {
            // Add/remove classified watermark on document
            const doc = overlay.querySelector('.nasa-document');
            if (doc) {
                doc.classList.toggle('nasa-doc-classified', isClassified);
            }
            overlay.classList.add('active');
        });
    }

    /* ========== Render ========== */
    function render() {
        const cabinet = document.querySelector('#archive-cabinet');
        if (!cabinet) return;
        cabinet.innerHTML = '';
        if (!state.data) return;

        const shelf = document.createElement('div');
        shelf.className = 'archive-shelf';

        getRoadmapItems().forEach(item => {
            shelf.appendChild(createFileCard(item));
        });

        cabinet.appendChild(shelf);
    }

    async function load() {
        try {
            const res = await fetch(FILE);
            if (!res.ok) throw new Error(res.status);
            state.data = await res.json();
            render();
        } catch (e) {
            console.error('[roadmap] load failed', e);
            state.data = null;
            render();
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        state.lang = (window.I18N && I18N.state && I18N.state.lang) || state.lang;
        load();
    });

    document.addEventListener('languageChanged', (evt) => {
        const next = (evt && evt.detail && evt.detail.lang) || (window.I18N && I18N.state && I18N.state.lang);
        if (next) state.lang = next;
        if (state.data) render();
    });
})();
