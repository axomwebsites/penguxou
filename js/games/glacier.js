export function startgame(canvas, onend) {
    const ctx = canvas.getContext('2d');
    let player = { x: 50, y: 150, w: 20, h: 20 };
    let obstacles = [];
    let score = 0;
    let frame = 0;
    let speed = 2;
    let running = true;

    const reset = () => {
        player.y = 150;
        obstacles = [];
        score = 0;
        speed = 2;
        running = true;
    };

    const update = () => {
        if (!running) return;
        frame++;
        if (frame % 20 === 0) {
            obstacles.push({ x: Math.random() * 350, y: 0, w: 30, h: 10 });
        }
        obstacles.forEach(o => o.y += speed);
        obstacles = obstacles.filter(o => o.y < 320);
        obstacles.forEach(o => {
            if (o.y < player.y + player.h && o.y + o.h > player.y &&
                o.x < player.x + player.w && o.x + o.w > player.x) {
                running = false;
                onend(score);
            }
        });
        player.y -= 1.5;
        if (player.y < 0) { player.y = 0; score++; speed += 0.05; }
        if (player.x < 0) player.x = 0;
        if (player.x > canvas.width - player.w) player.x = canvas.width - player.w;
    };

    const draw = () => {
        ctx.fillStyle = '#0a1a2a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#4fc3f7';
        ctx.fillRect(player.x, player.y, player.w, player.h);
        ctx.fillStyle = '#ff5252';
        obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h));
        ctx.fillStyle = '#fff';
        ctx.font = '16px monospace';
        ctx.fillText('Height: ' + score, 10, 30);
    };

    const loop = () => {
        if (!running) return;
        update();
        draw();
        requestAnimationFrame(loop);
    };

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * canvas.width;
        player.x = Math.min(Math.max(x - player.w/2, 0), canvas.width - player.w);
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const x = (e.touches[0].clientX - rect.left) / rect.width * canvas.width;
        player.x = Math.min(Math.max(x - player.w/2, 0), canvas.width - player.w);
    }, { passive: false });

    reset();
    loop();
    return { stop: () => { running = false; } };
                            }
