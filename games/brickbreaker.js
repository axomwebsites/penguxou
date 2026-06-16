window.games = window.games || {};
window.games["brick breaker"] = {
  icon: "fa-th-large",
  init: function() { window.objects = []; for(let i=0; i<5; i++) window.objects.push({x: 20+i*80, y: 60, w: 60, h: 20}); window.playerx = 180; window.gamesubstate = {bx: 220, by: 200, vx: 4, vy: -4}; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    drawpenguin(window.playerx, 420, 80, 20);
    let b = window.gamesubstate; b.bx += b.vx; b.by += b.vy;
    if(b.bx<10 || b.bx>canvas.width-10) b.vx *= -1; if(b.by<10) b.vy *= -1;
    if(b.by>410 && b.by<430 && b.bx>window.playerx && b.bx<window.playerx+80) b.vy *= -1;
    ctx.fillStyle = "#333"; ctx.beginPath(); ctx.arc(b.bx, b.by, 8, 0, Math.PI*2); ctx.fill();
    for(let i=window.objects.length-1; i>=0; i--) {
      let r = window.objects[i]; ctx.fillStyle = "#e67e22"; ctx.fillRect(r.x, r.y, r.w, r.h);
      if(b.bx>r.x && b.bx<r.x+r.w && b.by>r.y && b.by<r.y+r.h) { b.vy *= -1; window.objects.splice(i,1); window.gamescore++; state.coins+=5; }
    }
    if(window.objects.length===0) { for(let i=0; i<5; i++) window.objects.push({x: 20+i*80, y: 60, w: 60, h: 20}); }
    if(b.by>canvas.height) endgame();
  }
};
