// 动态加载项目数据并渲染项目卡
// 简单：本地 JSON + 按当前语言字段；若缺失则回退 en-US → zh-CN

(async function () {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    // 移除占位空卡
    const placeholder = grid.querySelector('.project-card.empty');
    if (placeholder) placeholder.remove();

    let data = [];
    try {
        const res = await fetch('./assets/data/projects.json?cb=' + Date.now());
        data = await res.json();
    } catch (e) {
        console.warn('[projects] load failed', e);
    }

    const lang = (window.I18N && I18N.state && I18N.state.lang) || 'zh-CN';
    const fallbackChain = [lang, 'en-US', 'zh-CN'];

    function pick(obj) {
        for (const k of fallbackChain) { if (obj[k]) return obj[k]; }
        // 如果对象是字符串直接返回
        if (typeof obj === 'string') return obj;
        return Object.values(obj)[0] || '';
    }

    const frag = document.createDocumentFragment();

    if (!data.length) {
        renderEmpty();
    } else data.forEach(item => {
        const card = document.createElement('a');
        card.className = 'project-card';
        card.href = item.url;
        card.target = '_blank';
        card.rel = 'noopener';

        const title = document.createElement('h4');
        title.textContent = pick(item.name);

        const desc = document.createElement('p');
        desc.textContent = pick(item.desc);

        // 可选标签
        if (item.tags && item.tags.length) {
            const tagBar = document.createElement('div');
            tagBar.style.marginTop = '10px';
            tagBar.style.display = 'flex';
            tagBar.style.flexWrap = 'wrap';
            tagBar.style.gap = '6px';
            item.tags.forEach(t => {
                const span = document.createElement('span');
                span.textContent = t;
                span.style.fontSize = '11px';
                span.style.letterSpacing = '.5px';
                span.style.padding = '4px 8px 5px';
                span.style.border = '1px solid var(--divider)';
                span.style.borderRadius = '30px';
                span.style.color = 'var(--text-dim)';
                span.style.background = 'linear-gradient(var(--panel-alt), var(--panel))';
                tagBar.appendChild(span);
            });
            card.appendChild(tagBar);
        }

        card.appendChild(title);
        card.appendChild(desc);

        frag.appendChild(card);
    });

    grid.appendChild(frag);

    // 语言切换后重新渲染（简单监听 i18n apply）
    document.addEventListener('languageChanged', () => {
        grid.querySelectorAll('.project-card').forEach(c => c.remove());
        if (!data.length) {
            renderEmpty();
        } else {
            data.forEach(item => {
                const card = document.createElement('a');
                card.className = 'project-card';
                card.href = item.url;
                card.target = '_blank';
                card.rel = 'noopener';
                const title = document.createElement('h4');
                title.textContent = pick(item.name);
                const desc = document.createElement('p');
                desc.textContent = pick(item.desc);
                card.appendChild(title);
                card.appendChild(desc);
                grid.appendChild(card);
            });
        }
    });

    function renderEmpty() {
        const card = document.createElement('div');
        card.className = 'project-card empty';
        const h4 = document.createElement('h4');
        h4.textContent = I18N ? I18N.t('projects.empty.title') : 'Coming Soon';
        const p = document.createElement('p');
        p.textContent = I18N ? I18N.t('projects.empty.desc') : 'Projects will appear here.';
        const note = document.createElement('div');
        note.className = 'empty-note';
        note.textContent = 'placeholder';
        card.appendChild(h4);
        card.appendChild(p);
        card.appendChild(note);
        grid.appendChild(card);
    }
})();