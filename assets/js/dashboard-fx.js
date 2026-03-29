// 路线图仪表盘装饰 — 示波器波形图 + 雷达扫描圆盘
(function () {
    // 等待 DOM 就绪
    function init() {
        const container = document.querySelector('.roadmap-dashboard');
        if (!container) return;

        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq.matches) return;

        initOscilloscope(container.querySelector('#oscilloscope'));
        initRadar(container.querySelector('#radar'));
    }

    // ====== 示波器 ======
    function initOscilloscope(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let W, H, phase = 0, raf;

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            W = canvas.width = rect.width * dpr;
            H = canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        }

        function draw() {
            const w = W / dpr, h = H / dpr;
            ctx.clearRect(0, 0, w, h);

            // 网格线
            ctx.strokeStyle = 'rgba(0, 255, 60, .08)';
            ctx.lineWidth = 0.5;
            const gridX = 8, gridY = 4;
            for (let i = 1; i < gridX; i++) {
                const x = (w / gridX) * i;
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
            }
            for (let i = 1; i < gridY; i++) {
                const y = (h / gridY) * i;
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
            }

            // 中心基线
            ctx.strokeStyle = 'rgba(0, 255, 60, .15)';
            ctx.beginPath();
            ctx.moveTo(0, h / 2);
            ctx.lineTo(w, h / 2);
            ctx.stroke();

            // 波形
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 255, 60, .7)';
            ctx.lineWidth = 1.5;
            ctx.shadowColor = 'rgba(0, 255, 60, .4)';
            ctx.shadowBlur = 6;

            for (let x = 0; x < w; x++) {
                const t = (x / w) * Math.PI * 6 + phase;
                const y1 = Math.sin(t) * (h * 0.28);
                const y2 = Math.sin(t * 2.3 + 1.2) * (h * 0.12);
                const y = h / 2 + y1 + y2;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            phase += 0.03;
            raf = requestAnimationFrame(draw);
        }

        resize();
        draw();
        window.addEventListener('resize', resize);
    }

    // ====== 雷达 ======
    function initRadar(canvas) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let W, H, angle = 0, raf;

        // 固定散点
        const blips = Array.from({ length: 6 }, () => ({
            angle: Math.random() * Math.PI * 2,
            dist: 0.2 + Math.random() * 0.7,
            alpha: 0.4 + Math.random() * 0.5,
        }));

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            W = canvas.width = rect.width * dpr;
            H = canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        }

        function draw() {
            const w = W / dpr, h = H / dpr;
            const cx = w / 2, cy = h / 2;
            const r = Math.min(cx, cy) * 0.85;

            ctx.clearRect(0, 0, w, h);

            // 同心圆
            ctx.strokeStyle = 'rgba(0, 255, 60, .1)';
            ctx.lineWidth = 0.5;
            for (let i = 1; i <= 4; i++) {
                ctx.beginPath();
                ctx.arc(cx, cy, (r / 4) * i, 0, Math.PI * 2);
                ctx.stroke();
            }

            // 十字线
            ctx.beginPath();
            ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy);
            ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r);
            ctx.stroke();

            // 扫描线 (渐变扇形)
            const grad = ctx.createConicalGradient
                ? null  // conical not well supported, use arc approach
                : null;

            // 扫描扇形区域
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            const sweepGrad = ctx.createLinearGradient(0, 0, r, 0);
            sweepGrad.addColorStop(0, 'rgba(0, 255, 60, .25)');
            sweepGrad.addColorStop(1, 'rgba(0, 255, 60, .02)');

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, r, -0.4, 0);
            ctx.closePath();
            ctx.fillStyle = sweepGrad;
            ctx.fill();

            // 扫描线本身
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(r, 0);
            ctx.strokeStyle = 'rgba(0, 255, 60, .6)';
            ctx.lineWidth = 1;
            ctx.shadowColor = 'rgba(0, 255, 60, .4)';
            ctx.shadowBlur = 4;
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.restore();

            // 散点
            for (const b of blips) {
                const bx = cx + Math.cos(b.angle) * b.dist * r;
                const by = cy + Math.sin(b.angle) * b.dist * r;

                // 当扫描线经过时散点变亮
                let angleDiff = Math.abs(((angle % (Math.PI * 2)) - b.angle + Math.PI * 2) % (Math.PI * 2));
                if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
                const brightness = angleDiff < 0.5 ? (1 - angleDiff / 0.5) * 0.8 : 0;

                ctx.beginPath();
                ctx.arc(bx, by, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 60, ${b.alpha * 0.3 + brightness})`;
                ctx.fill();

                if (brightness > 0.2) {
                    ctx.beginPath();
                    ctx.arc(bx, by, 5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 255, 60, ${brightness * 0.2})`;
                    ctx.fill();
                }
            }

            angle += 0.015;
            raf = requestAnimationFrame(draw);
        }

        resize();
        draw();
        window.addEventListener('resize', resize);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // roadmap.js 动态插入仪表盘后也触发初始化
    document.addEventListener('dashboardReady', init);
})();
