var game = new Phaser.Game(940, 540, Phaser.AUTO, 'foo',
  { preload: preload, create: create, update: update });

var walls;
var actors;
var player;

function preload() {

  game.load.image('wide', 'assets/wide.png');
  game.load.image('tall', 'assets/tall.png');
  game.load.image('player', 'assets/player.png');
  game.load.image('monster', 'assets/monster.png');

}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  keys = game.input.keyboard.createCursorKeys();

  walls = game.add.group();

  walls.create(0, 0, 'wide');
  walls.create(0, 520, 'wide');
  walls.create(0, 0, 'tall');
  walls.create(920, 0, 'tall');

  walls.enableBody = true;
  walls.getAt(0).immovable = true;
  walls.getAt(1).immovable = true;
  walls.getAt(2).immovable = true;
  walls.getAt(3).immovable = true;

  actors = game.add.group()
  actors.create(300, 300, 'monster');
  actors.enableBody = true;

  player = game.add.sprite(20, 20, 'player');
  player.enableBody = true;

  //collisions


}

function update() {

  if (keys.left.isDown)
    {
        player.x -= 5;
    }
    else if (keys.right.isDown)
    {
        player.x += 5;
    }
    else if (keys.up.isDown)
    {
        player.y -= 5;
    }
    else if (keys.down.isDown)
    {
        player.y += 5;
    }

}
