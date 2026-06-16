window.games = window.games || {};
window.games["hungry run"] = {
  icon: "fa-cookie-bite",
  init: function() { window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    if(Math.random()<0.05) window.objects.push({ x: Math.random()*(canvas.width-30), y: -20, speed: 5 });
    drawpenguin(playerx, playery, 50, 55);
    for(let i=window.objects.length-1; i>=0; i--) {
      let o = window.objects[i]; o.y += o.speed; ctx.fillStyle = "#e74c3c"; ctx.fillRect(o.x, o.y, 20, 20);
      if(o.y+20>playery && o.y<playery+55 && o.x+20>playerx && o.x<playerx+50) { window.gamescore++; state.coins+=2; window.objects.splice(i,1); }
      if(o.y>canvas.height) endgame();
    }
  }
};
