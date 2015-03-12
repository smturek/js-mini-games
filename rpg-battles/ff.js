var game = new Phaser.Game(1255, 665, Phaser.AUTO, 'ffBattle',
  { preload: preload, create: create, update: update });

function preload () {

  game.load.image('menu', 'imgs/menu.png');
  game.load.image('attack', 'imgs/attack.png');
  game.load.image('magic', 'imgs/magic.png');
  game.load.image('items', 'imgs/items.png');
  game.load.image('player', 'imgs/player.png');
  game.load.image('monster', 'imgs/monster.png');
}

var menu;
var player;
var attack;
var magic;
var items;
var monster;
var attackAnim;

function create () {

  menu = game.add.sprite(game.world.centerX - 200,465, 'menu');
  player = game.add.sprite(game.world.centerX + 400, game.world.centerY - 100, 'player');
  attack = game.add.button(game.world.centerX - 200, 465, 'attack', attack, this);
  magic = game.add.button(game.world.centerX - 200, 515, 'magic');
  items = game.add.button(game.world.centerX - 200, 565, 'items');
  monster = game.add.sprite(game.world.centerX - 550, game.world.centerY - 200, 'monster');

}

function update () {

}

function attack () {
  attackAnim = game.add.tween(player).to({ x: game.world.centerX - 250 }, 500, Phaser.Easing.Sinusoidal.InOut, true, 0, 0, true);
}
