window.games = window.games || {};
window.games["subway glide"] = {
  icon: "fa-train",
  init: function() { window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    if(Math.random()<0.06) window.objects.push({ x: Math.random()*(canvas.width-40), y: -40, speed: 7 });
    ctx.fillStyle = "#34495e"; ctx.fillRect(0,0,canvas.width,canvas.height);
    drawpenguin(playerx, playery, 50, 55);
    for(let i=window.objects.length-1; i>=0; i--) {
      let o = window.objects[i]; o.y += o.speed; ctx.fillStyle = "#95a5a6"; ctx.fillRect(o.x, o.y, 35, 60);
      if(o.y+60>playery && o.y<playery+55 && o.x+35>playerx && o.x<playerx+50) endgame();
      if(o.y>canvas.height) { window.objects.splice(i,1); window.gamescore++; state.coins++; }
    }
  }
};
