window.games = window.games || {};
window.games["football penalties"] = {
  icon: "fa-futbol",
  init: function() { window.gamesubstate = 0; window.objects = [{ x: 200, y: 380, vx: 0, vy: 0, active: false }]; window.playery = 120; window.playerx = 200; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    ctx.fillStyle = "#2ecc71"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff"; ctx.fillRect(80, 50, 280, 10);
    let ball = window.objects[0];
    if (window.gamesubstate === 0) {
      window.playerx += window.playervx;
      if (window.playerx < 80) window.playerx = 80; if (window.playerx > 300) window.playerx = 300;
      drawpenguin(window.playerx, window.playery, 50, 55);
      if (!ball.active && Math.random() < 0.03) { ball.active = true; ball.vx = (Math.random() - 0.5) * 8; ball.vy = -8 - Math.random() * 4; }
      if (ball.active) {
        ball.x += ball.vx; ball.y += ball.vy; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2); ctx.fill();
        if (ball.y < window.playery + 55 && ball.y > window.playery && ball.x > window.playerx && ball.x < window.playerx + 50) {
          window.gamescore++; state.coins += 3; ball.active = false; ball.x = 200; ball.y = 380;
          if (window.gamescore % 3 === 0) { window.gamesubstate = 1; window.playery = 380; window.playerx = 200; }
        } else if (ball.y < 50) { endgame(); }
      }
    } else {
      drawpenguin(200 + Math.sin(window.gametimer * 0.1) * 30, 80, 50, 55); drawpenguin(window.playerx, window.playery, 50, 55);
      if (!ball.active) { ball.active = true; ball.x = window.playerx + 25; ball.y = window.playery; ball.vx = (Math.random() - 0.5) * 6; ball.vy = -9; }
      if (ball.active) {
        ball.x += ball.vx; ball.y += ball.vy; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2); ctx.fill();
        let gk = 200 + Math.sin(window.gametimer * 0.1) * 30;
        if (ball.y < 140 && ball.x > gk && ball.x < gk + 50) { endgame(); }
        else if (ball.y < 50) { window.gamescore++; state.coins += 3; ball.active = false; window.gamesubstate = 0; window.playery = 120; window.playerx = 200; }
      }
    }
  }
};
