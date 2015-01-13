function init() {

  var stage = new createjs.Stage("ebCanvas");

  var enemy = new createjs.Bitmap("imgs/starman.gif");

  stage.addChild(enemy);
  enemy.x = 400;
  enemy.y = 100;


  createjs.Ticker.addEventListener("tick", tick);
  createjs.Ticker.setInterval(200);

  function tick() {
    stage.update();
  }
}
