window.games = window.games || {};
window.games["star catcher"] = {
  icon: "fa-star",
  init: function() { window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    if (Math.random() < 0.05) window.objects.push({ x: Math.random()*(canvas.width-25), y: -20, speed: 4+Math.random()*3, type: Math.random()>0.3?"good":"bad" });
    drawpenguin(playerx, playery, 50, 55);
    for(let i=window.objects.length-1; i>=0; i--) {
      let o = window.objects[i]; o.y += o.speed; ctx.fillStyle = o.type==="good"?"#f1c40f":"#e74c3c"; ctx.fillRect(o.x, o.y, 25, 25);
      if (o.y+25>playery && o.y<playery+55 && o.x+25>playerx && o.x<playerx+50) {
        if(o.type==="good") { window.gamescore++; state.coins+=2; } else { endgame(); return; }
        window.objects.splice(i,1); continue;
      }
      if(o.y>canvas.height) window.objects.splice(i,1);
    }
  }
};
