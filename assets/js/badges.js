// 动态渲染技能 + 认证徽章
(function () {
    const section = document.querySelector('#badges .badges-grid');
    if (!section) return;

    // 初始清空静态占位
    section.innerHTML = '';

    let cache = null;
    let currentLang = null;

    function current() {
        return (window.I18N && I18N.state && I18N.state.lang) || 'zh-CN';
    }

    function pickLabel(obj) {
        const lang = current();
        return obj[lang] || obj['en-US'] || obj['zh-CN'] || Object.values(obj)[0] || '';
    }

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
        currentLang = current();
        section.innerHTML = '';

        if (!cache.groups.length) {
            const empty = document.createElement('div');
            empty.className = 'badge badge-empty';
            empty.textContent = I18N ? I18N.t('badges.placeholder') : 'Coming soon';
            section.appendChild(empty);
            return;
        }

        cache.groups.forEach(group => {
            const header = document.createElement('div');
            header.className = 'badge-group-title';
            // 优先用 i18n 键： badges.group.<type> ；若不存在则回退原 JSON 内 label
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
                const clickable = !!item.url;
                const el = document.createElement(clickable ? 'a' : 'div');
                el.className = 'badge ' + (item.kind || 'skill');
                if (clickable) {
                    el.href = item.url;
                    el.target = '_blank';
                    el.rel = 'noopener noreferrer';
                    el.setAttribute('aria-label', pickLabel(item.label) + ' link');
                }
                // 图标
                if (item.icon) {
                    const iconWrap = document.createElement('span');
                    iconWrap.className = 'badge-icon';
                    iconWrap.innerHTML = item.icon; // 受控内嵌 SVG
                    el.appendChild(iconWrap);
                }
                const label = document.createElement('span');
                label.className = 'badge-label';
                label.textContent = pickLabel(item.label);
                el.appendChild(label);
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