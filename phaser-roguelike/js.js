var game = new Phaser.Game(940, 540, Phaser.AUTO, 'foo',
  { preload: preload, create: create, update: update });

var walls;
var exit;
var noExit = true;
var player;

var monsters;
var monster;
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
  enemyBullets.createMultiple(60, 'enemyBullet');
  enemyBullets.setAll('outOfBoundsKill', true);
  enemyBullets.setAll('checkWorldBounds', true);

  monsters = game.add.group()
  monsters.enableBody = true;

  monster = monsters.create(300, 300, 'monster');
  monster.body.immovable = true;

  monster = monsters.create(700, 400, 'monster');
  monster.body.immovable = true;

  monster = monsters.create(500, 100, 'monster');
  monster.body.immovable = true;

  monster = monsters.create(200, 450, 'monster');
  monster.body.immovable = true;

  player = game.add.sprite(20, 20, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds= true;

}

function update() {
  game.physics.arcade.collide(player, walls);
  game.physics.arcade.collide(player, monsters);
  game.physics.arcade.collide(monsters, walls);
  game.physics.arcade.overlap(bullets, walls, hitsWall);
  game.physics.arcade.overlap(enemyBullets, walls, hitsWall);
  game.physics.arcade.overlap(monsters, bullets, handleCollisions);
  game.physics.arcade.overlap(exit, player, renderLevel)

  keys = game.input.keyboard.createCursorKeys();

  player.body.velocity.y = 0;
  player.body.velocity.x = 0;

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

  if (game.time.now > enemyTimer)
      {
        enemyFires();
        enemyTimer = game.time.now + 200;
      }
  if (monsters.getFirstAlive() === null && noExit)
    {
      showExit();
    }

}

function renderLevel() {
  exit.kill();
  noExit = true;
  var randMonsters = Math.floor(Math.random() * (10 - 4) + 4);
  var x;
  var y;

  for(var i = 0; i < randMonsters; i++) {
    x = Math.floor(Math.random() * (890 - 20) + 20);
    y = Math.floor(Math.random() * (490 - 20) + 20);

    monster = monsters.create(x, y, 'monster');
    monster.body.immovable = true;
  }
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

function handleCollisions(bullet, monster) {
  bullet.kill();
  monster.kill();
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
