window.games = window.games || {};
window.games["flappy penguin"] = {
  icon: "fa-feather-alt",
  init: function() { window.playery = 200; window.playervy = 0; window.objects = []; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    window.playervy += 0.7; window.playery += window.playervy; drawpenguin(100, window.playery, 45, 50);
    if(window.gametimer % 70 === 0) { let gap = 120; let topH = 50 + Math.random()*150; window.objects.push({x: canvas.width, th: topH, bh: canvas.height - topH - gap}); }
    canvas.onclick = () => { window.playervy = -8; };
    for(let i=window.objects.length-1; i>=0; i--) {
      let p = window.objects[i]; p.x -= 4; ctx.fillStyle = "#27ae60"; ctx.fillRect(p.x, 0, 50, p.th); ctx.fillRect(p.x, canvas.height-p.bh, 50, p.bh);
      if(p.x < 145 && p.x + 50 > 100 && (window.playery < p.th || window.playery + 50 > canvas.height - p.bh)) endgame();
      if(p.x === 100) { window.gamescore++; state.coins += 2; }
      if(p.x < -50) window.objects.splice(i,1);
    }
    if(window.playery>canvas.height || window.playery<0) endgame();
  }
};
