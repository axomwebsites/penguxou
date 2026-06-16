window.games = window.games || {};
window.games["shell game"] = {
  icon: "fa-circle-notch",
  init: function() { window.objects = [100, 220, 340]; window.gamesubstate = Math.floor(Math.random()*3); window.gametimer = 0; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    ctx.fillStyle = "#2c3e50"; window.objects.forEach((pos, idx) => { ctx.fillRect(pos, 200, 60, 60); });
    if(window.gametimer<60) { ctx.fillStyle = "#fff"; ctx.fillText("watch!", 180, 100); ctx.beginPath(); ctx.arc(window.objects[window.gamesubstate]+30, 230, 10, 0, Math.PI*2); ctx.fill(); }
    else { ctx.fillStyle = "#fff"; ctx.fillText("guess!", 180, 100); drawpenguin(playerx, 380, 60, 65);
      if(window.gametimer===61) { canvas.onclick = (e) => { let rect = canvas.getBoundingClientRect(); let clx = e.clientX - rect.left;
        if(clx > window.objects[window.gamesubstate] && clx < window.objects[window.gamesubstate]+60) { window.gamescore++; state.coins+=10; window.gametimer=0; window.gamesubstate = Math.floor(Math.random()*3); } else endgame();
      };}
    }
  }
};
