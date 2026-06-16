window.games = window.games || {};
window.games["fish drop"] = {
  icon: "fa-fish",
  init: function() { window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    if (Math.random() < 0.06) {
      let isbomb = Math.random() < 0.35;
      window.objects.push({ x: Math.random() * (canvas.width - 30), y: 0, speed: 4 + Math.random() * 4, bomb: isbomb });
    }
    drawpenguin(playerx, playery, 55, 60);
    for (let i = window.objects.length - 1; i >= 0; i--) {
      let o = window.objects[i]; o.y += o.speed;
      ctx.fillStyle = o.bomb ? "#e74c3c" : "#3498db";
      ctx.beginPath(); ctx.arc(o.x, o.y, o.bomb ? 12 : 9, 0, Math.PI * 2); ctx.fill();
      if (o.y > playery && o.y < playery + 60 && o.x > playerx && o.x < playerx + 55) {
        if (o.bomb) { endgame(); return; }
        else { window.gamescore++; state.coins += 2; window.objects.splice(i, 1); continue; }
      }
      if (o.y > canvas.height) { window.objects.splice(i, 1); }
    }
  }
};
