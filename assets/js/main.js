// Main interactions: backToTop, dynamic year, minor enhancements

(function () {
    const backBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 380) backBtn.classList.add('visible');
        else backBtn.classList.remove('visible');
    });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // dynamic year
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // theme toggle (light <-> dark gray)
    const STORAGE_KEY = 'theme';
    const root = document.documentElement;
    function applyTheme(val) {
        if (val === 'dark') { root.setAttribute('data-theme', 'dark'); }
        else { root.removeAttribute('data-theme'); }
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    applyTheme(saved);
    let btn = document.getElementById('themeToggle');
    if (!btn) {
        const header = document.querySelector('header .lang-switch') || document.querySelector('header');
        if (header) {
            btn = document.createElement('button');
            btn.id = 'themeToggle';
            btn.style.marginLeft = '8px';
            btn.style.border = '1px solid var(--divider)';
            btn.style.background = 'var(--panel)';
            btn.style.padding = '8px 14px';
            btn.style.borderRadius = '10px';
            btn.style.fontSize = '11px';
            btn.style.cursor = 'pointer';
            btn.style.letterSpacing = '.8px';
            btn.style.fontWeight = '600';
            header.appendChild(btn);
        }
    }
    function updateBtn() {
        if (!btn) return; btn.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
    }
    updateBtn();
    btn && btn.addEventListener('click', () => {
        const nowDark = root.getAttribute('data-theme') === 'dark';
        if (nowDark) { root.removeAttribute('data-theme'); localStorage.setItem(STORAGE_KEY, 'light'); }
        else { root.setAttribute('data-theme', 'dark'); localStorage.setItem(STORAGE_KEY, 'dark'); }
        updateBtn();
    });
})();
