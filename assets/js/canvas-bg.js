// Canvas 神经元/星座图粒子系统
// 淡色极细节点缓慢漂浮 + 距离阈值内绘制细线连接 + 偶尔闪烁 + 微弱荧光感
// 性能优化：空间分区连线、30fps 限帧、页面隐藏暂停、手机端降低粒子数

(function () {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true }) || canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth <= 640;
    const BASE = {
        particleCount: isMobile ? 46 : 126,
        maxDist: 194,
        speed: 0.2,
        particleRadius: 1.8,
        lineWidth: 0.78,
        color: '80, 80, 80',
        glowColor: '100, 100, 100',
        lineColor: '72, 72, 72'
    };
    const NEIGHBOR_OFFSETS = [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
        [-1, 1]
    ];

    let W = 0, H = 0, particles = [], raf = 0, resizeFrame = 0, running = false;
    let lastFrame = 0;
    let cfg = getQualityProfile();

    // 空间分区网格
    let grid = {}, cellSize = cfg.maxDist;

    function getQualityProfile() {
        const dpr = window.devicePixelRatio || 1;
        const cores = navigator.hardwareConcurrency || 8;
        const width = Math.max(window.innerWidth, 1);
        const height = Math.max(window.innerHeight, 1);
        const area = width * height;
        const highDensity = dpr > 1.5;
        const hugeViewport = area > 1600000;
        const constrained = highDensity || hugeViewport || cores <= 6;
        const renderScale = isMobile ? 0.58 : hugeViewport ? 0.55 : highDensity ? 0.68 : 0.82;
        return {
            particleCount: constrained ? Math.min(BASE.particleCount, 88) : BASE.particleCount,
            maxDist: constrained ? 168 : BASE.maxDist,
            speed: constrained ? 0.16 : BASE.speed,
            particleRadius: constrained ? 1.6 : BASE.particleRadius,
            lineWidth: constrained ? 0.62 : BASE.lineWidth,
            flickerChance: constrained ? 0.002 : 0.003,
            targetInterval: 1000 / (constrained ? 24 : 30),
            renderScale: Math.max(0.5, Math.min(0.9, renderScale)),
            lineOpacityBoost: constrained ? 0.46 : 0.56,
            minLineAlpha: constrained ? 0.035 : 0.05,
            color: BASE.color,
            glowColor: BASE.glowColor,
            lineColor: BASE.lineColor
        };
    }

    function cellKey(cx, cy) { return cx + '|' + cy; }

    function buildGrid() {
        grid = {};
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var cx = (p.x / cellSize) | 0;
            var cy = (p.y / cellSize) | 0;
            var key = cellKey(cx, cy);
            if (!grid[key]) grid[key] = [];
            grid[key].push(i);
        }
    }

    function resize() {
        cfg = getQualityProfile();
        cellSize = cfg.maxDist;
        W = Math.max(window.innerWidth, 1);
        H = Math.max(window.innerHeight, 1);
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        canvas.width = Math.max(1, Math.round(W * cfg.renderScale));
        canvas.height = Math.max(1, Math.round(H * cfg.renderScale));
        ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
    }

    function createParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * cfg.speed,
            vy: (Math.random() - 0.5) * cfg.speed,
            r: cfg.particleRadius * (0.6 + Math.random() * 0.8),
            alpha: 0.2 + Math.random() * 0.3,
            flicker: 0,
        };
    }

    function init() {
        resize();
        particles = [];
        var area = W * H;
        var densityBudget = cfg.renderScale < 0.7 ? 21000 : 17500;
        var count = Math.max(22, Math.min(cfg.particleCount, Math.floor(area / densityBudget)));
        for (var i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }

    function update() {
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
            if (p.flicker > 0) {
                p.flicker -= 0.02;
            } else if (Math.random() < cfg.flickerChance) {
                p.flicker = 0.5 + Math.random() * 0.3;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // 空间分区连线
        buildGrid();
        var maxDist2 = cfg.maxDist * cfg.maxDist;

        for (var key in grid) {
            var parts = key.split('|');
            var cx = +parts[0], cy = +parts[1];
            var cellA = grid[key];
            for (var ni = 0; ni < NEIGHBOR_OFFSETS.length; ni++) {
                var offset = NEIGHBOR_OFFSETS[ni];
                var neighborKey = cellKey(cx + offset[0], cy + offset[1]);
                var cellB = grid[neighborKey];
                if (!cellB) continue;
                for (var ai = 0; ai < cellA.length; ai++) {
                    var startJ = (offset[0] === 0 && offset[1] === 0) ? ai + 1 : 0;
                    for (var bi = startJ; bi < cellB.length; bi++) {
                        var idxA = cellA[ai], idxB = cellB[bi];
                        if (idxA === idxB) continue;
                        var a = particles[idxA], b = particles[idxB];
                        var dx = a.x - b.x, dy = a.y - b.y;
                        var dist2 = dx * dx + dy * dy;
                        if (dist2 < maxDist2) {
                            var opacity = Math.max(cfg.minLineAlpha, (1 - Math.sqrt(dist2) / cfg.maxDist) * cfg.lineOpacityBoost);
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.strokeStyle = 'rgba(' + cfg.lineColor + ', ' + opacity + ')';
                            ctx.lineWidth = cfg.lineWidth;
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        // 绘制粒子
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var alpha = Math.min(1, p.alpha + p.flicker);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + cfg.color + ', ' + alpha + ')';
            ctx.fill();

            if (p.flicker > 0.05) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + cfg.glowColor + ', ' + (p.flicker * 0.25) + ')';
                ctx.fill();
            }
        }
    }

    function loop(ts) {
        if (!running) return;
        raf = requestAnimationFrame(loop);
        if (ts - lastFrame < cfg.targetInterval) return;
        lastFrame = ts;
        update();
        draw();
    }

    function start() {
        if (running) return;
        running = true;
        lastFrame = 0;
        raf = requestAnimationFrame(loop);
    }

    function stop() {
        running = false;
        cancelAnimationFrame(raf);
    }

    function scheduleResize() {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(function () {
            init();
        });
    }

    // prefers-reduced-motion
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    init();
    start();

    // 页面隐藏时暂停
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            stop();
        } else {
            start();
        }
    });

    window.addEventListener('resize', scheduleResize, { passive: true });

    mq.addEventListener('change', function (e) {
        if (e.matches) {
            stop();
            ctx.clearRect(0, 0, W, H);
        } else {
            init();
            start();
        }
    });
})();
