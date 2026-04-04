// 简单多语言模块
// 语言检测 -> 加载对应 JSON -> 替换 data-i18n 属性元素文本

const I18N = (function () {
    const state = { lang: 'en-US', dict: {} };
    const supported = ['zh-CCN', 'zh-CN', 'en', 'en-US', 'ja', 'ja-JP'];

    function detect() {
    const nav = navigator.language || (navigator.languages && navigator.languages[0]) || 'en-US';
    if (nav.startsWith('zh')) return 'zh-CN';
    if (nav.startsWith('ja')) return 'ja-JP';
    return 'en-US';
    }

    async function load(lang) {
        const target = lang || detect();
        state.lang = target;
        try {
            const res = await fetch(`./assets/i18n/${target}.json`);
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

    function t(key) { return state.dict[key] || key; }

    function apply() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key.endsWith('.html')) {
                el.innerHTML = t(key);
            } else {
                el.textContent = t(key);
            }
        });
    }

    function switchLang(lang) {
        load(lang);
        localStorage.setItem('lang', lang);
        updateLangSwitcher(lang);
    }

    function init() {
        const saved = localStorage.getItem('lang');
        const initial = saved || detect();
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

    return { init, t, switchLang, state };
})();

window.addEventListener('DOMContentLoaded', I18N.init);
