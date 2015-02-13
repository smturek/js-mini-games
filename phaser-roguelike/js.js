var game = new Phaser.Game(940, 540, Phaser.AUTO, 'foo',
  { preload: preload, create: create, update: update });

var walls;
var exit;
var noExit = false;
var noPowerUp;

var level = 0
var levelString = "";
var levelText;
var gameOver;
var kills

var player;
var playerMaxLife = 3;
var lives;
var life;
var drops;
var drop;
var lifeUp;
var powerUp;

var monsters;
var monster;
var killCount = 0;
var livingMonsters;

var bullets;
var bulletTimer = 0;

var enemyBullets
var enemyTimer = 0;

var moveUp;
var moveDown;
var moveRight;
var moveLeft;

function preload() {

  game.load.image('wide', 'assets/wide.png');
  game.load.image('tall', 'assets/tall.png');
  game.load.image('exit', 'assets/exit.png');
  game.load.image('player', 'assets/player.png');
  game.load.image('monster', 'assets/monster.png');
  game.load.image('bullet', 'assets/bullet.png');
  game.load.image('enemyBullet', 'assets/ebullet.png');
  game.load.image('life', 'assets/life.png');
  game.load.image('powerUp', 'assets/powerup.png')
  game.load.image('lifeUp', 'assets/lifeup.png')

}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  moveUp = game.input.keyboard.addKey(87);
  moveDown = game.input.keyboard.addKey(83);
  moveLeft = game.input.keyboard.addKey(65);
  moveRight = game.input.keyboard.addKey(68);

  //walls
  walls = game.add.group();
  walls.enableBody = true;

  var wall = walls.create(0, 0, 'wide');
  wall.body.immovable = true;

  wall = walls.create(0, 520, 'wide');
  wall.body.immovable = true;

  wall = walls.create(0, 0, 'tall');
  wall.body.immovable = true;

  wall = walls.create(920, 0, 'tall');
  wall.body.immovable = true;

  //player's bullet group
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);

  //enemy's bullet group
  enemyBullets = game.add.group();
  enemyBullets.enableBody = true;
  enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
  enemyBullets.createMultiple(100, 'enemyBullet');
  enemyBullets.setAll('outOfBoundsKill', true);
  enemyBullets.setAll('checkWorldBounds', true);

  monsters = game.add.group()
  monsters.enableBody = true;

  lives = game.add.group();
  for(var i = 0; i < playerMaxLife; i++) {
    life = lives.create(854 + 25 * i, 2, 'life')
  }

  drops = game.add.group();
  drops.enableBody = true;

  gameOver = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
  gameOver.anchor.setTo(0.5, 0.5);
  gameOver.visible = false;

  kills= game.add.text(game.world.centerX, game.world.centerY + 70, ' ', {font: '26px Arial', fill: '#fff'});
  kills.anchor.setTo(0.5, 0.5);
  kills.visible = false;

  player = game.add.sprite(20, 20, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds= true;

  levelString = 'Level: ';
  levelText = game.add.text(20, 1, levelString + level, { font: '16px arial', fill: '#fff' });

  showExit();

}

function update() {
  game.physics.arcade.collide(player, walls);
  game.physics.arcade.collide(player, monsters);
  game.physics.arcade.collide(monsters, walls);
  game.physics.arcade.overlap(bullets, walls, hitsWall);
  game.physics.arcade.overlap(enemyBullets, walls, hitsWall);
  game.physics.arcade.overlap(monsters, bullets, handleCollisions);
  game.physics.arcade.overlap(enemyBullets, player, playerHit, null, this);
  game.physics.arcade.overlap(exit, player, renderLevel);
  game.physics.arcade.overlap(drops, player, pickUp);

  keys = game.input.keyboard.createCursorKeys();

  player.body.velocity.y = 0;
  player.body.velocity.x = 0;

  if(player.alive) {
    if (moveUp.isDown) {
      player.body.velocity.y -= 250;
    }
    else if (moveDown.isDown) {
      player.body.velocity.y += 250;
    }
    else if (moveRight.isDown) {
      player.body.velocity.x += 250;
    }
    else if (moveLeft.isDown) {
      player.body.velocity.x -= 250;
    }

    if (keys.left.isDown)
      {
        fireBullet("left");
      }
    else if (keys.right.isDown)
      {
        fireBullet("right");
      }
    else if (keys.up.isDown)
      {
        fireBullet("up");
      }
    else if (keys.down.isDown)
      {
        fireBullet("down");
      }

    if (monsters.getFirstAlive() === null && noExit)
      {
        showExit();
      }
  }

  if (game.time.now > enemyTimer) {
      enemyFires();
      enemyTimer = game.time.now + 1000;
  }

}

function renderLevel() {
  exit.kill();
  noExit = true;
  noPowerUp = true;
  enemyTimer = game.time.now + 500;
  var randMonsters = Math.floor(Math.random() * (10 - 4) + 4);
  var x;
  var y;

  for(var i = 0; i < randMonsters; i++) {
    x = Math.floor(Math.random() * (890 - 20) + 20);
    y = Math.floor(Math.random() * (490 - 20) + 20);

    monster = monsters.create(x, y, 'monster');
    monster.body.immovable = true;
  }
  level++;
  levelText.text = levelString + level;
}

function showExit() {
  var x = Math.floor(Math.random() * (890 - 20) + 20);
  var y = Math.floor(Math.random() * (490 - 20) + 20);
  exit = game.add.sprite(x, y, 'exit');
  game.physics.arcade.enable(exit);
  noExit = false;
}

function fireBullet(direction) {
  if (game.time.now > bulletTimer) {
    bullet = bullets.getFirstExists(false);
    if (bullet)
    {
        bullet.reset(player.x + 8, player.y + 8);
        if(direction === "up") {
          bullet.body.velocity.y = -400;
        }
        else if(direction === "down") {
          bullet.body.velocity.y = 400;
        }
        else if(direction === "right") {
          bullet.body.velocity.x = 400;
        }
        else if(direction === "left") {
          bullet.body.velocity.x = -400;
        }

        bulletTimer = game.time.now + 300;
    }
  }
}

function pickUp(player, drop) {
  drop.kill();
  if(drop.key === "lifeUp") {
    // makes sure to add the life at the end of the missing lives so that diplay is consistent
    var missingLife = lives.getFirstDead();
    var missingLifeIndex = lives.getChildIndex(missingLife);
    if(missingLife) {
      console.log(missingLifeIndex);
    }
  }
  else if(drop.key === "powerUp" && noPowerUp === true) {
    console.log("POWER!!!!!!!")
    noPowerUp = false;
  }

}

function handleCollisions(monster, bullet) {
  bullet.kill();
  monster.kill();
  killCount++;
  var rand = game.rnd.integerInRange(0, 10);
  if(rand < 1) {
    drop = drops.create(monster.x, monster.y, "powerUp")
    drop.body.immovable = true;
  }
  else if(rand < 4) {
    drop = drops.create(monster.x, monster.y, "lifeUp")
    drop.body.immovable = true;
  }
}

function playerHit(player, bullet) {
  bullet.kill();

  life = lives.getFirstAlive();

  if(life) {
    life.kill();
  }

  if (lives.countLiving() < 1) {
    player.kill();
    gameOver.text = "YOU HAVE DIED";
    kills.text = "YOU HAVE SLAIN " + killCount + " MONSTERS!" ;
    kills.visible = true;
    gameOver.visible = true;
  }
}

function hitsWall(bullet) {
  bullet.kill();
}

function enemyFires() {
  livingMonsters = [];
  monsters.forEachAlive(function(monster) {
    livingMonsters.push(monster)
  });

  if(livingMonsters.length > 0) {
    for(var i = 0; i < livingMonsters.length; i++) {
      enemyBullet = enemyBullets.getFirstExists(false)
      if(enemyBullet) {
        enemyBullet.reset(livingMonsters[i].body.x, livingMonsters[i].body.y);
        game.physics.arcade.moveToObject(enemyBullet,player,200);
      }
    }
  }
}
