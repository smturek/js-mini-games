var game = new Phaser.Game(940, 540, Phaser.AUTO, 'foo',
  { preload: preload, create: create, update: update });

var walls;
var actors;
var player;
var monster;
var monster1;
var monster2;
var monster3;

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
  enemyBullets.createMultiple(30, 'enemyBullet');
  enemyBullets.setAll('outOfBoundsKill', true);
  enemyBullets.setAll('checkWorldBounds', true);

  actors = game.add.group()
  actors.enableBody = true;

  monster = actors.create(300, 300, 'monster');
  monster.body.immovable = true;

  player = game.add.sprite(20, 20, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds= true;

}

function update() {
  game.physics.arcade.collide(player, walls);
  game.physics.arcade.collide(player, actors);
  game.physics.arcade.collide(actors, walls);
  game.physics.arcade.overlap(bullets, walls, hitsWall);
  game.physics.arcade.overlap(enemyBullets, walls, hitsWall);
  game.physics.arcade.overlap(actors, bullets, handleCollisions);

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
      }

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
  //  Grab the first bullet we can from the pool
  if(monster.alive) {
    enemyBullet = enemyBullets.getFirstExists(false);
    // And fire the bullet from this enemy
    enemyBullet.reset(monster.body.x, monster.body.y);

    game.physics.arcade.moveToObject(enemyBullet,player,120);
    enemyTimer = game.time.now + 200;
  }
}
