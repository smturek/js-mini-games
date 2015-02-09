var game = new Phaser.Game(940, 540, Phaser.AUTO, 'foo',
  { preload: preload, create: create, update: update });

var walls;
var actors;
var player;
var monster

var fireUp
var fireDown
var fireRight
var fireLeft

function preload() {

  game.load.image('wide', 'assets/wide.png');
  game.load.image('tall', 'assets/tall.png');
  game.load.image('player', 'assets/player.png');
  game.load.image('monster', 'assets/monster.png');

}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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
  game.physics.arcade.collide(player, actors)

  keys = game.input.keyboard.createCursorKeys();

  player.body.velocity.y = 0;
  player.body.velocity.x = 0;
  monster.body.velocity.y = 0;
  monster.body.velocity.x = 0;

  if (game.input.keyboard.isDown(87)) {
    player.body.velocity.y -= 250;
  }
  else if (game.input.keyboard.isDown(83)) {
    player.body.velocity.y += 250;
  }
  else if (game.input.keyboard.isDown(68)) {
    player.body.velocity.x += 250;
  }
  else if (game.input.keyboard.isDown(65)) {
    player.body.velocity.x -= 250;
  }

  if (keys.left.isDown)
    {
      player.body.velocity.x -= 250;
    }
  else if (keys.right.isDown)
    {
      player.body.velocity.x += 250;
    }
  else if (keys.up.isDown)
    {
      player.body.velocity.y -= 250;
    }
  else if (keys.down.isDown)
    {
      player.body.velocity.y += 250;
    }

  //radomizes monster movement
  var monsterMovement = Math.floor(Math.random() * (4 - 0) + 0);

  if (monsterMovement === 0)
    {
      monster.body.velocity.x -= 250;
    }
  else if (monsterMovement === 1)
    {
      monster.body.velocity.x += 250;
    }
  else if (monsterMovement === 2)
    {
      monster.body.velocity.y -= 250;
    }
  else if (monsterMovement === 3)
    {
      monster.body.velocity.y += 250;
    }

}
