// 动态渲染技能 + 认证徽章 — 点击弹出 NASA 信封卡片
(function () {
    const section = document.querySelector('#badges .badges-grid');
    if (!section) return;

    section.innerHTML = '';

    let cache = null;

    const WORM_SVG = '<svg viewBox="0 0 380 60" xmlns="http://www.w3.org/2000/svg" aria-label="CyberYimein"><text x="0" y="48" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="900" font-size="42" letter-spacing="6" fill="#FF3C00" style="text-transform:uppercase">CYBERYIMEIN</text></svg>';

    function current() {
        return (window.I18N && I18N.state && I18N.state.lang) || 'zh-CN';
    }

    function pickLabel(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        const lang = current();
        return obj[lang] || obj['en-US'] || obj['zh-CN'] || Object.values(obj)[0] || '';
    }

    const STATUS_MAP = {
        'zh-CN': { active: '有效', expired: '已过期', retired: '已退休' },
        'en-US': { active: 'Active', expired: 'Expired', retired: 'Retired' },
        'ja-JP': { active: '有効', expired: '期限切れ', retired: '退役' }
    };

    const PROF_LABEL = {
        'zh-CN': '熟练度',
        'en-US': 'Proficiency',
        'ja-JP': '習熟度'
    };

    const OBTAINED_LABEL = {
        'zh-CN': '获取时间',
        'en-US': 'Obtained',
        'ja-JP': '取得日'
    };

    const VALIDITY_LABEL = {
        'zh-CN': '状态',
        'en-US': 'Validity',
        'ja-JP': '有効性'
    };

    const LEARN_MORE = {
        'zh-CN': '了解更多',
        'en-US': 'Learn More',
        'ja-JP': '詳細を見る'
    };

    // ====== Envelope overlay (singleton) ======
    let overlay = document.querySelector('.badge-card-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'badge-card-overlay';
        overlay.innerHTML = `
            <div class="badge-envelope">
                <button class="envelope-close">&times;</button>
                <div class="envelope-header">
                    <div class="envelope-sender">
                        <div class="sender-logo">${WORM_SVG}</div>
                        <div class="sender-org">
                            CyberYimein · Bug Manufacturing Unit<br>
                            Tokyo, Japan
                        </div>
                    </div>
                    <div class="envelope-stamp">
                        <div class="stamp-label">Official Record</div>
                        <div class="stamp-icon"></div>
                    </div>
                </div>
                <div class="envelope-body">
                    <div class="envelope-title"></div>
                    <div class="envelope-kind"></div>
                    <div class="envelope-proficiency"></div>
                    <div class="envelope-cert-info"></div>
                    <div class="envelope-comment"></div>
                    <div class="envelope-divider"></div>
                    <a class="envelope-link" href="#" target="_blank" rel="noopener noreferrer">
                        <span class="link-text"></span>
                        <span class="arrow">→</span>
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.querySelector('.envelope-close').addEventListener('click', (e) => {
            e.stopPropagation();
            closeCard();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeCard();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) closeCard();
        });
    }

    function openCard(item) {
        const lang = current();
        const label = pickLabel(item.label);
        const kind = item.kind || 'skill';

        // Stamp icon
        overlay.querySelector('.stamp-icon').innerHTML = item.icon || '';

        // Title + kind
        overlay.querySelector('.envelope-title').textContent = label;
        const kindLabel = kind === 'cert'
            ? { 'zh-CN': '认证', 'en-US': 'Certification', 'ja-JP': '認定' }[lang] || 'Certification'
            : { 'zh-CN': '技能', 'en-US': 'Skill', 'ja-JP': 'スキル' }[lang] || 'Skill';
        overlay.querySelector('.envelope-kind').textContent = kindLabel;

        // Proficiency (skills only)
        const profBlock = overlay.querySelector('.envelope-proficiency');
        if (kind === 'skill' && item.proficiency) {
            const max = 5;
            const filled = Math.min(max, Math.max(0, Number(item.proficiency)));
            profBlock.innerHTML = `
                <span class="proficiency-label">${PROF_LABEL[lang] || PROF_LABEL['en-US']}</span>
                <div class="proficiency-dots">
                    ${Array.from({ length: max }, (_, i) =>
                        `<div class="dot${i < filled ? ' filled' : ''}"></div>`
                    ).join('')}
                </div>
            `;
            profBlock.style.display = '';
        } else {
            profBlock.innerHTML = '';
            profBlock.style.display = 'none';
        }

        // Cert info (certs only)
        const certBlock = overlay.querySelector('.envelope-cert-info');
        if (kind === 'cert') {
            const statusText = (STATUS_MAP[lang] || STATUS_MAP['en-US'])[item.status || 'active'] || item.status;
            const statusClass = 'status-' + (item.status || 'active');
            certBlock.innerHTML = `
                <div class="cert-info-item">
                    <span class="cert-info-label">${OBTAINED_LABEL[lang] || OBTAINED_LABEL['en-US']}</span>
                    <span class="cert-info-value">${escapeHtml(item.obtainedDate || '—')}</span>
                </div>
                <div class="cert-info-item">
                    <span class="cert-info-label">${VALIDITY_LABEL[lang] || VALIDITY_LABEL['en-US']}</span>
                    <span class="cert-info-value ${statusClass}">${escapeHtml(statusText)}</span>
                </div>
            `;
            certBlock.style.display = '';
        } else {
            certBlock.innerHTML = '';
            certBlock.style.display = 'none';
        }

        // Comment
        overlay.querySelector('.envelope-comment').textContent = pickLabel(item.comment) || '';

        // Link
        const linkEl = overlay.querySelector('.envelope-link');
        if (item.url) {
            linkEl.href = item.url;
            linkEl.querySelector('.link-text').textContent = LEARN_MORE[lang] || LEARN_MORE['en-US'];
            linkEl.style.display = '';
        } else {
            linkEl.style.display = 'none';
        }

        requestAnimationFrame(() => { overlay.classList.add('active'); });
    }

    function closeCard() {
        overlay.classList.remove('active');
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ====== Load & Render ======
    async function load() {
        if (cache) return cache;
        try {
            const res = await fetch('./assets/data/badges.json?cb=' + Date.now());
            cache = await res.json();
        } catch (e) {
            console.warn('[badges] load failed', e);
            cache = { groups: [] };
        }
        return cache;
    }

    function render() {
        if (!cache) return;
        section.innerHTML = '';

        if (!cache.groups.length) {
            const empty = document.createElement('div');
            empty.className = 'badge badge-empty';
            empty.textContent = window.I18N ? I18N.t('badges.placeholder') : 'Coming soon';
            section.appendChild(empty);
            return;
        }

        cache.groups.forEach(group => {
            const header = document.createElement('div');
            header.className = 'badge-group-title';
            const i18nKey = 'badges.group.' + (group.type || '').trim();
            if (window.I18N && I18N.dict && I18N.t && I18N.t(i18nKey) !== i18nKey) {
                header.textContent = I18N.t(i18nKey);
            } else if (group.label) {
                header.textContent = pickLabel(group.label);
            } else {
                header.textContent = group.type || 'Group';
            }
            section.appendChild(header);

            const wrap = document.createElement('div');
            wrap.className = 'badge-group';

            group.items.forEach(item => {
                const el = document.createElement('div');
                el.className = 'badge ' + (item.kind || 'skill');
                el.tabIndex = 0;
                el.style.cursor = 'pointer';
                el.setAttribute('aria-label', pickLabel(item.label));

                // Icon
                if (item.icon) {
                    const iconWrap = document.createElement('span');
                    iconWrap.className = 'badge-icon';
                    iconWrap.innerHTML = item.icon;
                    el.appendChild(iconWrap);
                }
                const label = document.createElement('span');
                label.className = 'badge-label';
                label.textContent = pickLabel(item.label);
                el.appendChild(label);

                // Click → open envelope card
                el.addEventListener('click', () => { openCard(item); });
                el.addEventListener('keypress', (evt) => {
                    if (evt.key === 'Enter' || evt.key === ' ') {
                        evt.preventDefault();
                        openCard(item);
                    }
                });

                wrap.appendChild(el);
            });

            section.appendChild(wrap);
        });
    }

    async function init() {
        await load();
        render();
        document.addEventListener('languageChanged', () => { render(); });
    }

    init();
})();