window.games = window.games || {};
window.games["coin miner"] = {
  icon: "fa-coins",
  init: function() { window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    if (Math.random() < 0.08) window.objects.push({ x: Math.random()*(canvas.width-20), y: -20, speed: 4+Math.random()*3, type: Math.random()>0.2?"coin":"rock" });
    drawpenguin(playerx, playery, 50, 55);
    for(let i=window.objects.length-1; i>=0; i--) {
      let o = window.objects[i]; o.y += o.speed; ctx.fillStyle = o.type==="coin"?"#f1c40f":"#7f8c8d"; ctx.beginPath(); ctx.arc(o.x, o.y, 10, 0, Math.PI*2); ctx.fill();
      if (o.y+10>playery && o.y<playery+55 && o.x+10>playerx && o.x<playerx+50) {
        if(o.type==="coin") { window.gamescore++; state.coins+=3; } else { endgame(); return; }
        window.objects.splice(i,1); continue;
      }
      if(o.y>canvas.height) window.objects.splice(i,1);
    }
  }
};
