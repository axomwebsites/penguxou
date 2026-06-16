window.games = window.games || {};
window.games["car driving"] = {
  icon: "fa-car",
  init: function() { window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    if (Math.random() < 0.05) window.objects.push({ x: Math.random() * (canvas.width - 40), y: -20, speed: 6 + Math.random() * 4 });
    ctx.fillStyle = "#7f8c8d"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawpenguin(playerx, playery, 50, 55);
    for (let i = window.objects.length - 1; i >= 0; i--) {
      let o = window.objects[i]; o.y += o.speed; ctx.fillStyle = "#111"; ctx.fillRect(o.x, o.y, 35, 50);
      if (o.y + 50 > playery && o.y < playery + 55 && o.x + 35 > playerx && o.x < playerx + 50) { endgame(); return; }
      if (o.y > canvas.height) { window.objects.splice(i, 1); window.gamescore++; state.coins++; }
    }
  }
};
