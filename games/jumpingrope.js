window.games = window.games || {};
window.games["jumping rope"] = {
  icon: "fa-history",
  init: function() { window.gamesubstate = 0; window.playery = 380; window.playervy = 0; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    window.gamesubstate += 0.06 + (window.gamescore * 0.005);
    ctx.strokeStyle = "#333"; ctx.lineWidth = 4; ctx.beginPath();
    ctx.arc(220, 400, Math.abs(Math.sin(window.gamesubstate)) * 100, Math.PI, 0, Math.sin(window.gamesubstate) > 0); ctx.stroke();
    window.playervy += 1.5; window.playery += window.playervy;
    if (window.playery > 380) { window.playery = 380; window.playervy = 0; }
    drawpenguin(190, window.playery, 55, 60);
    if (Math.abs(window.gamesubstate % (Math.PI * 2) - Math.PI) < 0.2 && window.playery > 360) { endgame(); return; }
    if (Math.abs(window.gamesubstate % (Math.PI * 2) - Math.PI) < 0.2 && window.playery <= 360) { window.gamescore++; state.coins += 2; }
  }
};
