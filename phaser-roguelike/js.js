var game = new Phaser.Game(940, 540, Phaser.AUTO, 'foo',
  { preload: preload, create: create, update: update });

var walls;

function preload() {

  game.load.image('wide', 'assets/wide.png');
  game.load.image('tall', 'assets/tall.png');

}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

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



}

function update() {



}
