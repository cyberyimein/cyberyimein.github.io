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

    function createCard(item) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.tabIndex = 0;
        card.addEventListener('click', () => {
            card.classList.add('project-card-active');
            setTimeout(() => card.classList.remove('project-card-active'), 180);
        });
        card.addEventListener('keypress', (evt) => {
            if (evt.key === 'Enter' || evt.key === ' ') {
                evt.preventDefault();
                card.click();
            }
        });

        const title = document.createElement('h4');
        title.textContent = pick(item.name);
        card.appendChild(title);

    const desc = document.createElement('p');
    const descSource = item.description || '';
    desc.textContent = pick(descSource);
        card.appendChild(desc);

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
            card.appendChild(tagBar);
        }

        if (item.repo) {
            const repoLink = document.createElement('a');
            repoLink.className = 'project-github';
            repoLink.href = item.repo;
            repoLink.target = '_blank';
            repoLink.rel = 'noopener';
            repoLink.setAttribute('aria-label', `GitHub: ${pick(item.name)}`);
            repoLink.innerHTML = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 2-.27 7.5 7.5 0 0 1 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>`;
            card.appendChild(repoLink);
        }

        return card;
    }

    function renderProjects() {
        grid.querySelectorAll('.project-card').forEach(c => c.remove());
        if (!data.length) {
            renderEmpty();
            return;
        }
        const containerFrag = document.createDocumentFragment();
        data.forEach(item => {
            containerFrag.appendChild(createCard(item));
        });
        grid.appendChild(containerFrag);
    }

    renderProjects();

    // 语言切换后重新渲染（简单监听 i18n apply）
    document.addEventListener('languageChanged', () => {
        renderProjects();
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