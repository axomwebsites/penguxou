window.games = window.games || {};
window.games["target practice"] = {
  icon: "fa-bullseye",
  init: function() { window.gamesubstate = {tx: 200, ty: 150, vx: 5}; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    let t = window.gamesubstate; t.tx += t.vx; if(t.tx<40 || t.tx>canvas.width-40) t.vx *= -1;
    ctx.fillStyle = "#e74c3c"; ctx.beginPath(); ctx.arc(t.tx, t.ty, 25, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(t.tx, t.ty, 12, 0, Math.PI*2); ctx.fill();
    drawpenguin(playerx, 380, 50, 55);
    canvas.onclick = () => { if(Math.abs(playerx+25 - t.tx) < 30) { window.gamescore++; state.coins+=4; t.tx = Math.random()*300; } else endgame(); };
  }
};
