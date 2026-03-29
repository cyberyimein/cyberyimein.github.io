// Canvas 神经元/星座图粒子系统
// 淡色极细节点缓慢漂浮 + 距离阈值内绘制细线连接 + 偶尔闪烁 + 微弱荧光感

(function () {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 配置
    const CFG = {
        particleCount: 120,
        maxDist: 180,         // 连线最大距离
        speed: 0.2,           // 漂浮速度
        particleRadius: 1.8,
        lineWidth: 0.7,
        color: '80, 80, 80',  // RGB 深灰粒子 — 更可见
        glowColor: '100, 100, 100',
        flickerChance: 0.003,  // 每帧闪烁概率
    };

    let W, H, particles = [], raf;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * CFG.speed,
            vy: (Math.random() - 0.5) * CFG.speed,
            r: CFG.particleRadius * (0.6 + Math.random() * 0.8),
            alpha: 0.2 + Math.random() * 0.3,
            flicker: 0,
        };
    }

    function init() {
        resize();
        particles = [];
        // 根据屏幕面积调整粒子数量
        const area = W * H;
        const count = Math.min(CFG.particleCount, Math.floor(area / 18000));
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }

    function update() {
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;

            // 边界反弹
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            // 闪烁：偶尔短暂提高 alpha
            if (p.flicker > 0) {
                p.flicker -= 0.02;
            } else if (Math.random() < CFG.flickerChance) {
                p.flicker = 0.5 + Math.random() * 0.3;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // 绘制连线 (星座图)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CFG.maxDist) {
                    const opacity = (1 - dist / CFG.maxDist) * 0.35;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(${CFG.color}, ${opacity})`;
                    ctx.lineWidth = CFG.lineWidth;
                    ctx.stroke();
                }
            }
        }

        // 绘制粒子 (神经元)
        for (const p of particles) {
            const alpha = Math.min(1, p.alpha + p.flicker);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${CFG.color}, ${alpha})`;
            ctx.fill();

            // 荧光发光
            if (p.flicker > 0.05) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${CFG.glowColor}, ${p.flicker * 0.25})`;
                ctx.fill();
            }
        }
    }

    function loop() {
        update();
        draw();
        raf = requestAnimationFrame(loop);
    }

    // prefers-reduced-motion 检查
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    init();
    loop();

    window.addEventListener('resize', () => {
        resize();
        // 不重新创建粒子，只调整画布大小
    });

    mq.addEventListener('change', (e) => {
        if (e.matches) {
            cancelAnimationFrame(raf);
            ctx.clearRect(0, 0, W, H);
        } else {
            init();
            loop();
        }
    });
})();
