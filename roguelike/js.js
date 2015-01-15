function init() {

  var stage = new createjs.Stage("roguelikeCanvas");

  var lfHeld;
  var rtHeld;
  var fwdHeld;
  var backHeld;

  var KEYCODE_S = 83;
  var KEYCODE_W = 87;
  var KEYCODE_A = 65;
  var KEYCODE_D = 68;

  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  var player = new createjs.Shape();
  player.graphics.beginFill("white").drawCircle(0, 0, 10);
  player.x = 450;
  player.y = 250;

  stage.addChild(player);

  createjs.Ticker.addEventListener("tick", tick);

  function tick() {

    if (lfHeld) {
      player.x -= 5;
    } else if (rtHeld) {
      player.x += 5;
    } else if (fwdHeld) {
      player.y -= 5;
    } else if (backHeld) {
      player.y += 5;
    }

    stage.update();
  }

  //allow for WASD and arrow control scheme
function handleKeyDown(e) {
  //cross browser issues exist
  if (!e) {
    var e = window.event;
  }

  switch (e.keyCode) {
    case KEYCODE_A:
      lfHeld = true;
      break;
    case KEYCODE_D:
      rtHeld = true;
      return false;
    case KEYCODE_W:
      fwdHeld = true;
      return false;
    case KEYCODE_S:
      backHeld = true;
      return false;
  }
}

function handleKeyUp(e) {
  //cross browser issues exist
  if (!e) {
    var e = window.event;
  }

  switch (e.keyCode) {
    case KEYCODE_A:
      lfHeld = false;
      break;
    case KEYCODE_D:
      rtHeld = false;
      break;
    case KEYCODE_W:
      fwdHeld = false;
      break;
    case KEYCODE_S:
      backHeld = false;
      break;
  }
}

}
