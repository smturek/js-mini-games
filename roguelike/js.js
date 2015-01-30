function init() {

  var stage = new createjs.Stage("roguelikeCanvas");

  var lfHeld;
  var rtHeld;
  var fwdHeld;
  var backHeld;
  var shoot;

  var blocksInSector = 25;
  var sectorsInLevel = 45;
  var exit = false;

  var walls = [];
  var wallThickness = 20;

  var playerSize = 20;
  var playerSpeed = 10;
  var playerMaxHealth = 3;
  var playerCurrentHealth = 3;
  var playerHealthBar = [];
  var playerAlive = true;

  var floor = 0;

  var actors = [];

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
  var KEYCODE_SPACE = 32;

  var lastUpdate = 0;

  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  var gameOver = new createjs.Text("Game Over ", "60px times new roman", "red");
  gameOver.x = 340;
  gameOver.y = 220

  var generateHealthBar = function() {
    for(var i = 0; i < playerMaxHealth; i++) {
      playerHealthBar[i] = new createjs.Shape();
    }
  }

  var generateBlock = function() {
    var seed = Math.random();
    var block = 0;

    //exit
    if(seed <= .0001 && !exit) {
      block = 3;
      exit = true;
    }
    //treasure
    else if(seed <= .001) {
      block = 2;
    }
    //monster
    else if(seed <= .01) {
      block = 1;
    }
    //empty block
    else {
      block = 0;
    }
    return block;
  };

  var generateSector = function() {
    var sector = [];

    for(var i = 0; i < blocksInSector; i++) {
      sector[i] = generateBlock();
    }
    return sector;
  };

  var generateLevel = function() {
    var level = [];
    for(var i = 0; i < sectorsInLevel; i++) {
      if(i === 0) {
        level[i] = [0];
      }
      else {
        level[i] = generateSector();
      }
    }
    return level;
  };

  var handleCollision = function() {
    if(Object.getPrototypeOf(this) === Monster.prototype) {
      playerCurrentHealth--;
      if(playerCurrentHealth === 0) {
        playerAlive = false;
      }
    }
    else if(Object.getPrototypeOf(this) === Exit.prototype) {
      exit = false;
      displayLevel();
    }
  }

  var displayLevel = function() {
    stage.removeAllChildren();
    var currentLevel = generateLevel();
    floor++;
    actors = null;
    actors = [];
    player.x = 20;
    player.y = 20;

    var blockX;
    var blockY;
    var sectorX;
    var sectorY;
    var color;

    //if no exit
    if(!exit) {
      var sector = Math.floor(Math.random() * (45 - 1)) + 1;
      var block = Math.floor(Math.random() * (25 - 0)) + 0;
      currentLevel[sector][block] = 3;
    }

    //gets sectors
    for(var i = 0; i < currentLevel.length ; i++) {

      var currentSector = currentLevel[i];

      if(i < 9) {
        sectorX = 100*i + 20
        sectorY = 20;
      }
      else if(i < 18) {
        sectorX = 100*(i-9) + 20
        sectorY = 120;
      }
      else if(i < 27) {
        sectorX = 100*(i-18) + 20
        sectorY = 220;
      }
      else if(i < 36) {
        sectorX = 100*(i-27) + 20
        sectorY = 320;
      }
      else {
        sectorX = 100*(i-36) + 20
        sectorY = 420;
      }

      //gets blocks
      for(var j = 0; j < currentSector.length; j++) {

        var currentBlock = currentSector[j];

        if(j < 5) {
          blockX = sectorX + (20 * j)
          blockY = sectorY;
        }
        else if(j < 10) {
          blockX = sectorX + (20 * (j - 5))
          blockY = sectorY + 20;
        }
        else if(j < 15) {
          blockX = sectorX + (20 * (j - 10))
          blockY = sectorY + 40;
        }
        else if(j < 20) {
          blockX = sectorX + (20 * (j - 15))
          blockY = sectorY + 60;
        }
        else {
          blockX = sectorX + (20 * (j - 20))
          blockY = sectorY + 80;
        }

        if(currentBlock === 1) {
          color = "red";
          actors.push(new Monster(blockX, blockY, 20, 20, color));
        }
        else if(currentBlock === 2) {
          color = "yellow";
          actors.push(new Wall(blockX, blockY, 20, 20, color));
        }
        if(currentBlock === 3) {
          color = "purple";
          actors.push(new Exit(blockX, blockY, 20, 20, color));
        }
      }
    }
  };

  var show = function() {
    var visual = new createjs.Shape();
    visual.graphics.beginFill(this.color).drawRect(this.x, this.y, this.width, this.height);
    stage.addChild(visual);
  };

  var collide = function() {
    //collide top side
    if(player.x >= this.x &&
      player.x <= this.x + this.width &&
      player.y + playerSize === this.y + playerSpeed) {
        collision = true;
        collideTop = true;
        this.handleCollision();
      }

    else if(player.x + playerSize >= this.x &&
      player.x + playerSize <= this.x + this.width &&
      player.y + playerSize === this.y + playerSpeed) {
        collideTop = true;
        collision = true;
        this.handleCollision();
      }

    //collide bottom side
    else if(player.x >= this.x &&
      player.x <= this.x + this.width &&
      player.y === this.y + this.height - playerSpeed){
        collideBot = true;
        collision = true;
        this.handleCollision();
      }

    else if(player.x + playerSize >= this.x &&
      player.x + playerSize <= this.x + this.width &&
      player.y === this.y + this.height - playerSpeed){
        collideBot = true;
        collision = true;
        this.handleCollision();
      }

    //collide right side
    else if(player.y >= this.y &&
      player.y <= this.y + this.height &&
      player.x + playerSize === this.x + playerSpeed){
        collideRight = true;
        collision = true;
        this.handleCollision();
      }

    else if(player.y + playerSize >= this.y &&
      player.y + playerSize <= this.y + this.height &&
      player.x + playerSize === this.x + playerSpeed){
        collideRight = true;
        collision = true;
        this.handleCollision();
      }

    //collide left side
    else if(player.y >= this.y &&
      player.y <= this.y + this.height &&
      player.x === this.x + this.width - playerSpeed){
        collideLeft = true;
        collision = true;
        this.handleCollision();
      }

    else if(player.y + playerSize >= this.y &&
      player.y + playerSize <= this.y + this.height &&
      player.x === this.x + this.width - playerSpeed){
        collideLeft = true;
        collision = true;
        this.handleCollision();
      }
      //no collision
      else {
        return false;
      }
  };

  var player = new createjs.Shape();
  player.graphics.beginFill("blue").drawRect(0, 0, playerSize, playerSize);
  player.x = 20;
  player.y = 20;

  var Exit = function(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  Exit.prototype.collide = collide;
  Exit.prototype.handleCollision = handleCollision;
  Exit.prototype.show = show;

  //Bullet class
  var Bullet = function(x, y, radius, points, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.points = points;
    this.color = color;
  };

  Bullet.prototype.show = function() {
    var bullet = new createjs.Shape();
    bullet.graphics.beginFill(this.color).drawPolyStar(this.x,this.y, this.radius, this.points, 5, -90);
    stage.addChild(bullet);
  };

  //Player Class
  var Player = function(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  };

  //Monster Class
  var Monster = function(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  };

  Monster.prototype.show = show;
  Monster.prototype.collide = collide;
  Monster.prototype.handleCollision = handleCollision;
  Monster.prototype.move = function() {
    this.x += 5;
    this.y += 5;
  }

  //Wall Class
  var Wall = function(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  };

  Wall.prototype.show = show;
  Wall.prototype.collide = collide;
  Wall.prototype.handleCollision = handleCollision;

  //generate level
  displayLevel();
  generateHealthBar();

  walls.push(new Wall(0,0,940,wallThickness, "gray"));
  walls.push(new Wall(0,520,940,wallThickness, "gray"));
  walls.push(new Wall(920,0,wallThickness,540, "gray"));
  walls.push(new Wall(0,0,wallThickness,540, "gray"));

  for(var i = 0; i < walls.length; i++) {
    walls[i].show();
  }

  createjs.Ticker.addEventListener("tick", tick);

  function tick() {

    for(var i = 0; i < playerMaxHealth; i++) {
      var difference = playerMaxHealth - playerCurrentHealth;
      if(difference !== 0 && difference > i) {
        playerHealthBar[i].graphics.beginFill("gray").drawCircle(910 - 20*i, 30, 5);
      }
      else{
      playerHealthBar[i].graphics.beginFill("red").drawCircle(910 - 20*i, 30, 5);
      }
      stage.addChild(playerHealthBar[i]);
    }

    stage.addChild(player);

    for(var i = 0; i < walls.length; i++) {
      walls[i].show();
      walls[i].collide();
    }

    for(var i = 0; i < actors.length; i++) {
      actors[i].show();
      actors[i].collide();
    }

    //movement
    if (lfHeld && !collision) {
      player.x -= playerSpeed;
    } else if (rtHeld && !collision) {
      player.x += playerSpeed;
    } else if (fwdHeld && !collision) {
      player.y -= playerSpeed;
    } else if (backHeld && !collision) {
      player.y += playerSpeed;
    }

    //shooting
    //if (shoot)

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

    if(lastUpdate === 2) {
      Ticker.setPaused(true)
    }

    if(!playerAlive) {
      stage.addChild(gameOver);
      lastUpdate++;
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
      case KEYCODE_SPACE:
        shoot = true;
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
      case KEYCODE_SPACE:
        shoot = false;
        break;
    }
  }
}
