window.games = window.games || {};
window.games["cloud bounce"] = {
  icon: "fa-cloud",
  init: function() { window.objects = []; for(let i=0; i<6; i++) window.objects.push({x: Math.random()*340, y: 400-i*80, w: 75, h: 14}); window.playery = 300; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    window.playervy += 0.6; window.playery += window.playervy; window.playerx += window.playervx;
    if (window.playerx < 0) window.playerx = 0; if (window.playerx > 390) window.playerx = 390;
    if (window.playervy > 0) {
      window.objects.forEach(p => {
        if (window.playerx + 45 > p.x && window.playerx < p.x + p.w && window.playery + 55 > p.y && window.playery + 45 < p.y + p.h) { window.playervy = -14; window.gamescore++; state.coins++; }
      });
    }
    if (window.playery < 180) { let d = 180 - window.playery; window.playery = 180; window.objects.forEach(p => { p.y += d; if (p.y > canvas.height) { p.y = 0; p.x = Math.random()*340; } }); }
    drawpenguin(window.playerx, window.playery, 45, 55); ctx.fillStyle = "#fff"; window.objects.forEach(p => ctx.fillRect(p.x, p.y, p.w, p.h));
    if (window.playery > canvas.height) endgame();
  }
};
