(function () {
    const FILE = './assets/data/roadmap.json';
    const qs = sel => document.querySelector(sel);
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

    function createItem(item) {
        const li = document.createElement('li');
        const head = document.createElement('div');
        head.className = 'rm-head';

        const ver = document.createElement('span');
        ver.className = 'rm-version';
        ver.textContent = item.version;

        const strong = document.createElement('strong');
        strong.textContent = resolveLang(item.title);

        head.appendChild(ver);
        head.appendChild(strong);

        const desc = document.createElement('p');
        desc.className = 'rm-desc';
        desc.textContent = resolveLang(item.desc);

        const bar = document.createElement('div');
        bar.className = 'rm-bar';
        const fill = document.createElement('div');
        const cls = ['fill'];
        if (item.status === 'done') cls.push('done');
        else if (item.status === 'progress') cls.push('progress');
        fill.className = cls.join(' ');
        const pct = Math.max(0, Math.min(100, Number(item.percent) || 0));
        fill.style.width = pct + '%';
        bar.appendChild(fill);

        li.appendChild(head);
        li.appendChild(desc);
        li.appendChild(bar);
        return li;
    }

    function render() {
        const currentUL = qs('#roadmap-current');
        const completedUL = qs('#roadmap-completed');
        if (!currentUL || !completedUL) return;
        currentUL.innerHTML = '';
        completedUL.innerHTML = '';

        if (!state.data) {
            // error fallback
            const li = document.createElement('li');
            li.innerHTML = '<div class="rm-head"><span class="rm-version">?</span><strong>Load Error</strong></div><p class="rm-desc">roadmap.json not loaded</p><div class="rm-bar"><div class="fill progress" style="width:5%"></div></div>';
            currentUL.appendChild(li);
            return;
        }

        (state.data.current || []).forEach(item => currentUL.appendChild(createItem(item)));
        (state.data.completed || []).forEach(item => completedUL.appendChild(createItem(item)));
    }

    async function load() {
        try {
            const res = await fetch(FILE + '?cb=' + Date.now());
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
        if (state.data) {
            render();
        }
    });
})();
