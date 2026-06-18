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
        if (frame % 30 === 0) {
            obstacles.push({ x: 400, y: Math.random() * 250, w: 25, h: 35 });
        }
        obstacles.forEach(o => o.x -= speed);
        obstacles = obstacles.filter(o => o.x > -25);
        obstacles.forEach(o => {
            if (o.x < player.x + player.w && o.x + o.w > player.x &&
                o.y < player.y + player.h && o.y + o.h > player.y) {
                running = false;
                onend(score);
            }
        });
        if (player.y < 0) player.y = 0;
        if (player.y > canvas.height - player.h) player.y = canvas.height - player.h;
    };

    const draw = () => {
        ctx.fillStyle = '#0a1a3a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#4fc3f7';
        ctx.fillRect(player.x, player.y, player.w, player.h);
        ctx.fillStyle = '#ff5252';
        obstacles.forEach(o => {
            ctx.beginPath();
            ctx.ellipse(o.x + o.w/2, o.y + o.h/2, o.w/2, o.h/2, 0, 0, Math.PI*2);
            ctx.fill();
        });
        ctx.fillStyle = '#fff';
        ctx.font = '16px monospace';
        ctx.fillText('Score: ' + score, 10, 30);
    };

    const loop = () => {
        if (!running) return;
        update();
        draw();
        requestAnimationFrame(loop);
    };

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const y = (e.clientY - rect.top) / rect.height * canvas.height;
        player.y = Math.min(Math.max(y - player.h/2, 0), canvas.height - player.h);
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const y = (e.touches[0].clientY - rect.top) / rect.height * canvas.height;
        player.y = Math.min(Math.max(y - player.h/2, 0), canvas.height - player.h);
    }, { passive: false });

    reset();
    loop();
    return { stop: () => { running = false; } };
      }
