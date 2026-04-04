// Main interactions: backToTop, dynamic year, minor enhancements

(function () {
    const backBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 380) backBtn.classList.add('visible');
        else backBtn.classList.remove('visible');
    }, { passive: true });
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
            btn.style.marginLeft = '12px';
            btn.style.border = '1px solid var(--divider-bold)';
            btn.style.background = 'var(--bg-alt)';
            btn.style.padding = '6px 14px';
            btn.style.borderRadius = '0';
            btn.style.fontSize = '10px';
            btn.style.cursor = 'pointer';
            btn.style.letterSpacing = '1.5px';
            btn.style.fontWeight = '600';
            btn.style.fontFamily = "'IBM Plex Mono', monospace";
            btn.style.textTransform = 'uppercase';
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
