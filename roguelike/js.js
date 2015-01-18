function init() {

  var stage = new createjs.Stage("roguelikeCanvas");

  var lfHeld;
  var rtHeld;
  var fwdHeld;
  var backHeld;

  var playerSize = 10;

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
  player.graphics.beginFill("red").drawRect(0, 0, playerSize, playerSize);
  player.x = 10;
  player.y = 10;
  stage.addChild(player);

  var wallTop = new createjs.Shape();
  wallTop.graphics.beginFill("gray").drawRect(0,0,900,10);
  stage.addChild(wallTop);

  var wallBot = new createjs.Shape();
  wallBot.graphics.beginFill("gray").drawRect(0,490,900,10);
  stage.addChild(wallBot);

  var wallRight = new createjs.Shape();
  wallRight.graphics.beginFill("gray").drawRect(890,0,10,500);
  stage.addChild(wallRight);

  var wallLeft = new createjs.Shape();
  wallLeft.graphics.beginFill("gray").drawRect(0,0,10,500);
  stage.addChild(wallLeft);



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
    if(player.x > this.x &&
      player.x < this.x + this.width &&
      player.y + playerSize === this.y) {
        collideTop = true;
        collision = true;
      }

    else if(player.x + playerSize > this.x &&
      player.x + playerSize < this.x + this.width &&
      player.y + playerSize === this.y) {
        collideTop = true;
        collision = true;
      }

    //collide bottom side
    else if(player.x > this.x &&
      player.x < this.x + this.width &&
      player.y === this.y + this.height){
        collideBot = true;
        collision = true;
      }

    else if(player.x + playerSize > this.x &&
      player.x + playerSize < this.x + this.width &&
      player.y === this.y + this.height){
        collideBot = true;
        collision = true;
      }

    //collide right side
    else if(player.y >= this.y &&
      player.y <= this.y + this.height &&
      player.x + playerSize === this.x){
        collideRight = true;
        collision = true;
      }

    else if(player.y + playerSize >= this.y &&
      player.y + playerSize <= this.y + this.height &&
      player.x + playerSize === this.x){
        collideRight = true;
        collision = true;
      }

    //collide left side
    else if(player.y >= this.y &&
      player.y <= this.y + this.height &&
      player.x === this.x + this.width){
        collideLeft = true;
        collision = true;
      }

    else if(player.y + playerSize >= this.y &&
      player.y + playerSize <= this.y + this.height &&
      player.x === this.x + this.width){
        collideLeft = true;
        collision = true;
      }
      //no collision
      else {
        return false;
      }
  };


  var wall = new Wall(300, 200, 50, 10, "white");
  wall.show();

  var wall2 = new Wall(200, 300, 50, 10, "white");
  wall2.show();

  createjs.Ticker.addEventListener("tick", tick);

  function tick() {

    if (lfHeld && !collision) {
      player.x -= 5;
    } else if (rtHeld && !collision) {
      player.x += 5;
    } else if (fwdHeld && !collision) {
      player.y -= 5;
    } else if (backHeld && !collision) {
      player.y += 5;
    }

    wall.collide();
    wall2.collide();
    // console.log(player.x, player.y)
    // console.log(wall.x, wall.y)

    if (collideLeft) {
      player.x += 5;
      collideLeft = false;
    }
    else if (collideRight) {
      player.x -= 5;
      collideRight = false;
    }
    else if (collideTop) {
      player.y -= 5;
      collideTop = false;
    }
    else if (collideBot) {
      player.y += 5;
      collideBot = false;
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

  // function collide(player, wall) {
  //   //collide top side
  //   if(player.x > wall.x &&
  //     player.x < wall.x + 50 &&
  //     player.y + playerSize === wall.y) {
  //       collideTop = true;
  //       return true;
  //   }
  //
  //   else if(player.x + playerSize > wall.x &&
  //     player.x + playerSize < wall.x + 50 &&
  //     player.y + playerSize === wall.y) {
  //       collideTop = true;
  //       return true;
  //     }
  //
  //   //collide bottom side
  //   else if(player.x > wall.x &&
  //     player.x < wall.x + 50 &&
  //     player.y === wall.y + 10){
  //       collideBot = true;
  //       return true;
  //     }
  //
  //   else if(player.x + playerSize > wall.x &&
  //     player.x + playerSize < wall.x + 50 &&
  //     player.y === wall.y + 10){
  //       collideBot = true;
  //       return true;
  //     }
  //
  //   //collide right side
  //   else if(player.y >= wall.y &&
  //     player.y <= wall.y + 10 &&
  //     player.x + playerSize === wall.x){
  //       collideRight = true;
  //       return true;
  //     }
  //
  //   else if(player.y + playerSize >= wall.y &&
  //     player.y + playerSize <= wall.y + 10 &&
  //     player.x + playerSize === wall.x){
  //       collideRight = true;
  //       return true;
  //     }
  //
  //   //collide left side
  //   else if(player.y >= wall.y &&
  //     player.y <= wall.y + 10 &&
  //     player.x === wall.x + 50){
  //       collideLeft = true;
  //       return true;
  //     }
  //
  //   else if(player.y + playerSize >= wall.y &&
  //     player.y + playerSize <= wall.y + 10&&
  //     player.x === wall.x + 50){
  //       collideLeft = true;
  //       return true;
  //     }
  //   //no collision
  //   else {
  //     return false;
  //   }
  //}

}
