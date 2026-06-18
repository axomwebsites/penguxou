import { state, toast } from '#state';

export function initgames() {
    const arcadebtn = document.getElementById('arcadebtn');
    const overlay = document.getElementById('modaloverlay');
    const title = document.getElementById('modaltitle');
    const body = document.getElementById('modalbody');
    const closebtn = document.getElementById('modalclose');

    arcadebtn.addEventListener('click', async () => {
        title.textContent = '🎮 Arcade';
        body.innerHTML = `
            <div class="gameselection" id="gameselection"></div>
            <div id="gamecontainer" style="width:100%;height:300px;background:#0a0f1a;border-radius:12px;margin-top:8px;"></div>
        `;
        overlay.classList.add('open');

        const selector = document.getElementById('gameselection');
        const container = document.getElementById('gamecontainer');
        let canvas = document.createElement('canvas');
        canvas.id = 'arcadecanvas';
        canvas.width = 400;
        canvas.height = 300;
        container.appendChild(canvas);

        const manifest = await fetch('manifest.json').then(r => r.json());
        const games = manifest.games || [];

        if (games.length === 0) {
            selector.innerHTML = '<span style="color:#666;">No games available</span>';
            return;
        }

        let currentgame = null;
        let running = false;

        games.forEach(g => {
            const btn = document.createElement('button');
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.gap = '8px';
            btn.style.background = 'rgba(0,255,255,0.06)';
            btn.style.border = '1px solid rgba(0,255,255,0.08)';
            btn.style.color = '#88ddff';
            btn.style.padding = '4px 14px';
            btn.style.borderRadius = '30px';
            btn.style.fontFamily = 'inherit';
            btn.style.fontWeight = '700';
            btn.style.cursor = 'pointer';
            btn.style.transition = '0.2s';
            btn.style.fontSize = '12px';
            
            const img = document.createElement('img');
            img.src = g.icon;
            img.style.width = '20px';
            img.style.height = '20px';
            img.style.borderRadius = '4px';
            img.style.objectFit = 'cover';
            
            const span = document.createElement('span');
            span.textContent = g.name;
            
            btn.appendChild(img);
            btn.appendChild(span);
            
            btn.addEventListener('click', async () => {
                if (running) return;
                try {
                    const mod = await import(`./${g.file}`);
                    if (typeof mod.startgame === 'function') {
                        running = true;
                        if (currentgame && typeof currentgame.stop === 'function') currentgame.stop();
                        currentgame = mod.startgame(canvas, (score) => {
                            const reward = Math.floor(score / 10) + 5;
                            state.coins += reward;
                            toast(`Game over! +${reward} coins`);
                            running = false;
                        });
                    } else {
                        toast('Game not ready');
                    }
                } catch (e) {
                    toast('Failed to load game');
                    running = false;
                }
            });
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'rgba(0,255,255,0.15)';
                btn.style.borderColor = '#00ddff';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(0,255,255,0.06)';
                btn.style.borderColor = 'rgba(0,255,255,0.08)';
            });
            selector.appendChild(btn);
        });
    });

    closebtn.addEventListener('click', () => {
        overlay.classList.remove('open');
        const canvas = document.getElementById('arcadecanvas');
        if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    });
            }
