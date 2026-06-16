window.games = window.games || {};
window.games["math rush"] = {
  icon: "fa-calculator",
  init: function() { let a = Math.floor(Math.random()*10); let b = Math.floor(Math.random()*10); window.gamesubstate = {q: `${a}+${b}=?`, ans: a+b, choices: [a+b, a+b+3, a+b-2].sort(()=>Math.random()-0.5)}; },
  loop: function(ctx, canvas, state, playerx, playery, drawpenguin, endgame) {
    ctx.fillStyle = "#000"; ctx.font = "24px Courier"; ctx.fillText(window.gamesubstate.q, 160, 150);
    window.gamesubstate.choices.forEach((c, i) => { ctx.fillStyle = "#ddd"; ctx.fillRect(50+i*130, 300, 100, 50); ctx.fillStyle="#000"; ctx.fillText(c, 90+i*130, 335); });
    drawpenguin(playerx, 380, 50, 55);
    canvas.onclick = (e) => { let rect = canvas.getBoundingClientRect(); let cx = e.clientX-rect.left;
      let idx = Math.floor((cx-50)/130);
      if(idx>=0 && idx<3) { if(window.gamesubstate.choices[idx] === window.gamesubstate.ans) { window.gamescore++; state.coins+=6; let a = Math.floor(Math.random()*10); let b = Math.floor(Math.random()*10); window.gamesubstate = {q: `${a}+${b}=?`, ans: a+b, choices: [a+b+1, a+b, a+b-3].sort(()=>Math.random()-0.5)}; } else endgame(); }
    };
  }
};
