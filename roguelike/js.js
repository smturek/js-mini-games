function init() {

  var stage = new createjs.Stage("roguelikeCanvas");

  var lfHeld;
  var rtHeld;
  var fwdHeld;
  var backHeld;

  var walls = [];
  var wallThickness = 20;

  var playerSize = 20;
  var playerSpeed = 10;
  var playerMaxHealth = 6 ;
  var playerHealthBar = [];

  var monsterSize = 20;

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
  player.x = 20;
  player.y = 20;
  stage.addChild(player);

  //Monster Class
  var Monster = function(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  };

  Monster.prototype.show = function() {
    var monster = new createjs.Shape();
    monster.graphics.beginFill(this.color).drawRect(this.x, this.y, this.width, this.height);
    stage.addChild(monster);
  };

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

  //handles status bar
  for(var i = 0; i < playerMaxHealth; i++) {
    playerHealthBar[i] = new createjs.Shape();
    playerHealthBar[i].graphics.beginFill("red").drawCircle(870 - 20*i, 30, 5);
    stage.addChild(playerHealthBar[i]);
  }


  var monster = new Monster(200, 400, monsterSize, monsterSize, 'red')
  monster.show();

  walls.push(new Wall(0,0,900,wallThickness, "gray"));
  walls.push(new Wall(0,480,900,wallThickness, "gray"));
  walls.push(new Wall(880,0,wallThickness,500, "gray"));
  walls.push(new Wall(0,0,wallThickness,500, "gray"));

  for(var i = 0; i < walls.length; i++) {
    walls[i].show();
  }

  createjs.Ticker.addEventListener("tick", tick);

  function tick() {

    for(var i = 0; i < walls.length; i++) {
      walls[i].collide();
    }

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
