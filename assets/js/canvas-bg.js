// Canvas 神经元/星座图粒子系统
// 淡色极细节点缓慢漂浮 + 距离阈值内绘制细线连接 + 偶尔闪烁 + 微弱荧光感
// 性能优化：空间分区连线、30fps 限帧、页面隐藏暂停、手机端降低粒子数

(function () {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 配置
    const isMobile = window.innerWidth <= 640;
    const CFG = {
        particleCount: isMobile ? 50 : 120,
        maxDist: 180,
        speed: 0.2,
        particleRadius: 1.8,
        lineWidth: 0.7,
        color: '80, 80, 80',
        glowColor: '100, 100, 100',
        flickerChance: 0.003,
        targetInterval: 1000 / 30,  // 30fps
    };

    let W, H, particles = [], raf, running = false;
    let lastFrame = 0;

    // 空间分区网格
    let grid = {}, cellSize = CFG.maxDist;

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
        var area = W * H;
        var count = Math.min(CFG.particleCount, Math.floor(area / 18000));
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
            } else if (Math.random() < CFG.flickerChance) {
                p.flicker = 0.5 + Math.random() * 0.3;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // 空间分区连线
        buildGrid();
        var maxDist2 = CFG.maxDist * CFG.maxDist;
        var drawn = {};

        for (var key in grid) {
            var parts = key.split('|');
            var cx = +parts[0], cy = +parts[1];
            // 检查自身格子和相邻 4 个方向（避免重复对称检查）
            var neighbors = [
                cellKey(cx, cy),
                cellKey(cx + 1, cy),
                cellKey(cx, cy + 1),
                cellKey(cx + 1, cy + 1),
                cellKey(cx - 1, cy + 1)
            ];
            var cellA = grid[key];
            for (var ni = 0; ni < neighbors.length; ni++) {
                var cellB = grid[neighbors[ni]];
                if (!cellB) continue;
                for (var ai = 0; ai < cellA.length; ai++) {
                    var startJ = (key === neighbors[ni]) ? ai + 1 : 0;
                    for (var bi = startJ; bi < cellB.length; bi++) {
                        var idxA = cellA[ai], idxB = cellB[bi];
                        if (idxA === idxB) continue;
                        var pairKey = idxA < idxB ? idxA + '_' + idxB : idxB + '_' + idxA;
                        if (drawn[pairKey]) continue;
                        var a = particles[idxA], b = particles[idxB];
                        var dx = a.x - b.x, dy = a.y - b.y;
                        var dist2 = dx * dx + dy * dy;
                        if (dist2 < maxDist2) {
                            drawn[pairKey] = 1;
                            var opacity = (1 - Math.sqrt(dist2) / CFG.maxDist) * 0.35;
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.strokeStyle = 'rgba(' + CFG.color + ', ' + opacity + ')';
                            ctx.lineWidth = CFG.lineWidth;
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
            ctx.fillStyle = 'rgba(' + CFG.color + ', ' + alpha + ')';
            ctx.fill();

            if (p.flicker > 0.05) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + CFG.glowColor + ', ' + (p.flicker * 0.25) + ')';
                ctx.fill();
            }
        }
    }

    function loop(ts) {
        if (!running) return;
        raf = requestAnimationFrame(loop);
        if (ts - lastFrame < CFG.targetInterval) return;
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

    window.addEventListener('resize', function () {
        resize();
    });

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
