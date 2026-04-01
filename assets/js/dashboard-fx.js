/* ====== Telemetry readout — 文档 -end- 下方坐标/时间戳微跳动 ====== */
(function () {
    const BASE_LAT = 35.6895, BASE_LON = 139.6917; // Tokyo
    let raf = 0;

    function jitter(base, range) {
        return (base + (Math.random() - 0.5) * range).toFixed(4);
    }

    function tick(el) {
        const now = new Date();
        const ts = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
        const lat = jitter(BASE_LAT, 0.004);
        const lon = jitter(BASE_LON, 0.004);
        el.textContent = 'LAT: ' + lat + '  LON: ' + lon + '  ·  ' + ts;
        raf = requestAnimationFrame(() => {
            setTimeout(() => tick(el), 900 + Math.random() * 600);
        });
    }

    function start() {
        const el = document.querySelector('.nasa-doc-telemetry');
        if (!el) return;
        cancelAnimationFrame(raf);
        tick(el);
    }

    function stop() {
        cancelAnimationFrame(raf);
        raf = 0;
    }

    // 监听 overlay active 状态
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
            if (m.attributeName !== 'class') return;
            const overlay = m.target;
            if (overlay.classList.contains('active')) {
                start();
            } else {
                stop();
            }
        });
    });

    function attach() {
        const overlay = document.querySelector('.project-overlay');
        if (overlay) {
            observer.observe(overlay, { attributes: true });
        } else {
            // overlay 尚未创建，延迟重试
            requestAnimationFrame(attach);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { setTimeout(attach, 500); });
    } else {
        setTimeout(attach, 500);
    }
})();
