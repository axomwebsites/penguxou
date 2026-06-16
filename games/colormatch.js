window.games = window.games || {};
window.games["color match"] = {
  icon: "fa-palette",
  init: function() { window.gamesubstate = {target: Math.floor(Math.random()*3), current: 0}; window.objects = ["#e74c3c","#2ecc71","#f1c40f"]; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    ctx.fillStyle = window.objects[window.gamesubstate.target]; ctx.fillRect(0,0,canvas.width,40);
    drawpenguin(playerx, playery, 50, 55);
    ctx.fillStyle = window.objects[window.gamesubstate.current]; ctx.fillRect(playerx+15, playery-15, 20, 20);
    canvas.onclick = () => { window.gamesubstate.current = (window.gamesubstate.current+1)%3; };
    if(window.gametimer%60===0 && window.gametimer>0) { if(window.gamesubstate.current === window.gamesubstate.target) { window.gamescore++; state.coins+=5; window.gamesubstate.target = Math.floor(Math.random()*3); } else endgame(); }
  }
};
