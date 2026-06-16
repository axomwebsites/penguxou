window.games = window.games || {};
window.games["snowball fight"] = {
  icon: "fa-snowflake",
  init: function() { window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    if (Math.random() < 0.07) window.objects.push({ x: Math.random()*(canvas.width-20), y: -20, speed: 6+Math.random()*4 });
    drawpenguin(playerx, playery, 50, 55);
    for(let i=window.objects.length-1; i>=0; i--) {
      let o = window.objects[i]; o.y += o.speed; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(o.x, o.y, 12, 0, Math.PI*2); ctx.fill();
      if (o.y+12>playery && o.y<playery+55 && o.x+12>playerx && o.x<playerx+50) { endgame(); return; }
      if(o.y>canvas.height) { window.objects.splice(i,1); window.gamescore++; state.coins++; }
    }
  }
};
