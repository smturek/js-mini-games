function init() {

  var stage = new createjs.Stage("roguelikeCanvas");

  var lfHeld;
  var rtHeld;
  var fwdHeld;
  var backHeld;

  var playerSize = 10;
  var playerSpeed = 5;

  var collision = false;
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
  player.graphics.beginFill("blue").drawRect(0, 0, playerSize, playerSize);
  player.x = 10;
  player.y = 10;
  stage.addChild(player);

  //Wall Class
  var Wall = function(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  };

  Wall.prototype.show = function() {
    var visual = new createjs.Shape();
    visual.graphics.beginFill(this.color).drawRect(this.x, this.y, this.width, this.height);
    stage.addChild(visual);
  };

  Wall.prototype.collide = function() {
    //collide top side
    if(player.x >= this.x &&
      player.x <= this.x + this.width &&
      player.y + playerSize === this.y + playerSpeed) {
        collision = true;
        collideTop = true;
      }

    else if(player.x + playerSize >= this.x &&
      player.x + playerSize <= this.x + this.width &&
      player.y + playerSize === this.y + playerSpeed) {
        collideTop = true;
        collision = true;
      }

    //collide bottom side
    else if(player.x >= this.x &&
      player.x <= this.x + this.width &&
      player.y === this.y + this.height - playerSpeed){
        collideBot = true;
        collision = true;
      }

    else if(player.x + playerSize >= this.x &&
      player.x + playerSize <= this.x + this.width &&
      player.y === this.y + this.height - playerSpeed){
        collideBot = true;
        collision = true;
      }

    //collide right side
    else if(player.y >= this.y &&
      player.y <= this.y + this.height &&
      player.x + playerSize === this.x + playerSpeed){
        collideRight = true;
        collision = true;
      }

    else if(player.y + playerSize >= this.y &&
      player.y + playerSize <= this.y + this.height &&
      player.x + playerSize === this.x + playerSpeed){
        collideRight = true;
        collision = true;
      }

    //collide left side
    else if(player.y >= this.y &&
      player.y <= this.y + this.height &&
      player.x === this.x + this.width - playerSpeed){
        collideLeft = true;
        collision = true;
      }

    else if(player.y + playerSize >= this.y &&
      player.y + playerSize <= this.y + this.height &&
      player.x === this.x + this.width - playerSpeed){
        collideLeft = true;
        collision = true;
      }
      //no collision
      else {
        return false;
      }
  };

  var wallTop = new Wall(0,0,900,10, "gray");
  wallTop.show();

  var wallBot = new Wall(0,490,900,10, "gray");
  wallBot.show();

  var wallRight = new Wall(890,0,10,500, "gray");
  wallRight.show();

  var wallLeft = new Wall(0,0,10,500, "gray");
  wallLeft.show();

  var wall = new Wall(150, 0, 10, 135, "gray");
  wall.show();

  var wall2 = new Wall(0, 125, 90, 10, "gray");
  wall2.show();

  createjs.Ticker.addEventListener("tick", tick);

  function tick() {

    wallTop.collide();
    wallBot.collide();
    wallRight.collide();
    wallLeft.collide();
    wall.collide();
    wall2.collide();


    if (lfHeld && !collision) {
      player.x -= playerSpeed;
    } else if (rtHeld && !collision) {
      player.x += playerSpeed;
    } else if (fwdHeld && !collision) {
      player.y -= playerSpeed;
    } else if (backHeld && !collision) {
      player.y += playerSpeed;
    }

    if (collideLeft) {
      player.x += playerSpeed;
      collideLeft = false;
      collision = false;
    }
    else if (collideRight) {
      player.x -= playerSpeed;
      collideRight = false;
      collision = false;
    }
    else if (collideTop) {
      player.y -= playerSpeed;
      collideTop = false;
      collision = false;
    }
    else if (collideBot) {
      player.y += playerSpeed;
      collideBot = false;
      collision = false;
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
