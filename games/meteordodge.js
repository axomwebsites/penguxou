window.games = window.games || {};
window.games["meteor dodge"] = {
  icon: "fa-meteor",
  init: function() { window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    if(Math.random()<0.08) window.objects.push({ x: Math.random()*canvas.width, y: -20, vx: (Math.random()-0.5)*4, vy: 5+Math.random()*3 });
    drawpenguin(playerx, playery, 50, 55);
    for(let i=window.objects.length-1; i>=0; i--) {
      let o = window.objects[i]; o.x += o.vx; o.y += o.vy; ctx.fillStyle = "#e67e22"; ctx.beginPath(); ctx.arc(o.x, o.y, 14, 0, Math.PI*2); ctx.fill();
      if(o.y>playery && o.y<playery+55 && o.x>playerx && o.x<playerx+50) endgame();
      if(o.y>canvas.height) { window.objects.splice(i,1); window.gamescore++; state.coins++; }
    }
  }
};
