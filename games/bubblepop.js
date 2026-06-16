window.games = window.games || {};
window.games["bubble pop"] = {
  icon: "fa-circle",
  init: function() { window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    if(Math.random()<0.06) window.objects.push({ x: 30+Math.random()*(canvas.width-60), y: canvas.height+20, speed: 3+Math.random()*2 });
    drawpenguin(playerx, playery, 50, 55);
    canvas.onclick = (e) => { let rect = canvas.getBoundingClientRect(); let cx = e.clientX-rect.left; let cy = e.clientY-rect.top;
      window.objects.forEach((b,i) => { if(Math.hypot(b.x-cx, b.y-cy)<20) { window.objects.splice(i,1); window.gamescore++; state.coins+=2; } });
    };
    window.objects.forEach((b,i) => { b.y -= b.speed; ctx.fillStyle = "rgba(52, 152, 219, 0.6)"; ctx.beginPath(); ctx.arc(b.x, b.y, 20, 0, Math.PI*2); ctx.fill(); if(b.y<-20) endgame(); });
  }
};
