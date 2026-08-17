// Lightweight UI localization module.
// Detect a language, load its dictionary, and apply data-i18n attributes.

const I18N = (function () {
    const state = { lang: 'en-US', dict: {} };
    const supported = ['zh-CN', 'en-US', 'ja-JP'];

    function detect() {
        const nav = navigator.language || (navigator.languages && navigator.languages[0]) || 'en-US';
        if (nav.startsWith('zh')) return 'zh-CN';
        if (nav.startsWith('ja')) return 'ja-JP';
        return 'en-US';
    }

    async function load(lang) {
        const target = supported.includes(lang) ? lang : detect();
        state.lang = target;
        try {
            const res = await fetch(`./assets/i18n/${target}.json?v=20260818-harness-branches-2`);
            if (!res.ok) throw new Error('i18n load fail');
            state.dict = await res.json();
        } catch (e) {
            if (target !== 'zh-CN') { // 优先回退中文
                return load('zh-CN');
            }
            console.warn('[i18n] fallback zh-CN', e);
        }
        apply();
        updateLangSwitcher(state.lang);
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: state.lang } }));
    }

    function t(key, fallback) { return state.dict[key] || fallback || key; }

    function apply() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key.endsWith('.html')) {
                el.innerHTML = t(key);
            } else {
                el.textContent = t(key);
            }
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria-label')));
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
        });
        document.documentElement.lang = state.lang;

        const title = t('meta.title');
        if (title !== 'meta.title') {
            document.title = title;
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', title);
            const twitterTitle = document.querySelector('meta[name="twitter:title"]');
            if (twitterTitle) twitterTitle.setAttribute('content', title);
        }
        const description = t('meta.description');
        if (description !== 'meta.description') {
            const meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute('content', description);
            const og = document.querySelector('meta[property="og:description"]');
            if (og) og.setAttribute('content', description);
            const twitter = document.querySelector('meta[name="twitter:description"]');
            if (twitter) twitter.setAttribute('content', description);
        }
    }

    function switchLang(lang) {
        if (!supported.includes(lang)) return;
        load(lang);
        localStorage.setItem('lang', lang);
        updateLangSwitcher(lang);
    }

    function init() {
        const saved = localStorage.getItem('lang');
        const initial = supported.includes(saved) ? saved : detect();
        updateLangSwitcher(initial);
        load(initial);

        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', () => {
                const l = btn.getAttribute('data-lang');
                switchLang(l);
            });
        });
    }

    function updateLangSwitcher(lang) {
        document.querySelectorAll('.lang-switch button').forEach(btn => {
            const active = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('active', active);
        });
    }

    return {
        init,
        t,
        switchLang,
        state,
        supported,
        get dict() { return state.dict; }
    };
})();

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', I18N.init);
} else {
    I18N.init();
}
