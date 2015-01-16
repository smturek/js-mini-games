function init() {

  var stage = new createjs.Stage("roguelikeCanvas");

  var lfHeld;
  var rtHeld;
  var fwdHeld;
  var backHeld;

  var collideRight = false;
  var collideLeft = false;
  var collideTop = false;
  var collideBot = false;

  var KEYCODE_S = 83;
  var KEYCODE_W = 87;
  var KEYCODE_A = 65;
  var KEYCODE_D = 68;

  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  var player = new createjs.Shape();
  player.graphics.beginFill("red").drawRect(0, 0, 10, 10);
  player.x = 450;
  player.y = 250;
  stage.addChild(player);

  var wall = new createjs.Shape();
  wall.graphics.beginFill("white").drawRect(0,0,50,10);
  wall.x = 300;
  wall.y = 200;
  stage.addChild(wall);

  createjs.Ticker.addEventListener("tick", tick);

  function tick() {

    if (lfHeld && !collide(player, wall)) {
      player.x -= 5;
    } else if (rtHeld && !collide(player, wall)) {
      player.x += 5;
    } else if (fwdHeld && !collide(player, wall)) {
      player.y -= 5;
    } else if (backHeld && !collide(player, wall)) {
      player.y += 5;
    }

    console.log(player.x, player.y)
    console.log(wall.x, wall.y)

    // if (collideTop) {
    //   player.y += 1;
    //   collideTop = false;
    // }

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

  function collide(player, wall) {
    //collide top side
    if(player.x > wall.x &&
      player.x < wall.x + 50 &&
      player.y + 10 === wall.y) {
        collideTop = true;
        return true;
    }

    else if(player.x + 10 > wall.x &&
      player.x + 10 < wall.x + 50 &&
      player.y + 10 === wall.y) {
        collideTop = true;
        return true;
      }

    //collide bottom side
    else if(player.x > wall.x &&
      player.x < wall.x + 50 &&
      player.y === wall.y + 10){
        collideBot = true;
        return true;
      }

    else if(player.x + 10 > wall.x &&
      player.x + 10 < wall.x + 50 &&
      player.y === wall.y + 10){
        collideBot = true;
        return true;
      }

    //collide right side
    else if(player.y >= wall.y &&
      player.y <= wall.y + 10 &&
      player.x + 10 === wall.x){
        collideRight = true;
        return true;
      }

    else if(player.y + 10 >= wall.y &&
      player.y + 10 <= wall.y + 10 &&
      player.x + 10 === wall.x){
        collideRight = true;
        return true;
      }

    //collide left side
    else if(player.y >= wall.y &&
      player.y <= wall.y + 10 &&
      player.x === wall.x + 50){
        console.log("collide");
        collideLeft = true;
        return true;
      }

    else if(player.y + 10 >= wall.y &&
      player.y + 10 <= wall.y + 10&&
      player.x === wall.x + 50){
        console.log("collide");
        collideLeft = true;
        return true;
      }
    //no collision
    else {
      return false;
    }


  }

}
