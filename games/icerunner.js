window.games = window.games || {};
window.games["ice runner"] = {
  icon: "fa-snowflake",
  init: function() { window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    if (Math.random() < 0.06) window.objects.push({ x: Math.random() * (canvas.width - 35), y: -20, speed: 6 + Math.random() * 4 });
    ctx.fillStyle = "#e0f7fa"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawpenguin(playerx, playery, 50, 55);
    for (let i = window.objects.length - 1; i >= 0; i--) {
      let o = window.objects[i]; o.y += o.speed; ctx.fillStyle = "#00bcd4"; ctx.fillRect(o.x, o.y, 35, 35);
      if (o.y + 35 > playery && o.y < playery + 55 && o.x + 35 > playerx && o.x < playerx + 50) { endgame(); return; }
      if (o.y > canvas.height) { window.objects.splice(i, 1); window.gamescore++; state.coins++; }
    }
  }
};
