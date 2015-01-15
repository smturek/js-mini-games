function init() {

  var stage = new createjs.Stage("ebCanvas");

  var enemy = new createjs.Bitmap("imgs/starman.gif");
  enemy.x = 400;
  enemy.y = 100;

  var p1Name = new createjs.Text("Player 1", "26px Courier", "white");
  p1Name.x = 70;
  p1Name.y = 320;

  var p1Health = new createjs.Text("Health", "20px Courier", "white");
  p1Health.x = 70;
  p1Health.y = 386;

  var p1Magic = new createjs.Text("Magic", "20px Courier", "white");
  p1Magic.x = 70;
  p1Magic.y = 452;

  var p2Name = new createjs.Text("Player 2", "26px Courier", "white");
  p2Name.x = 290;
  p2Name.y = 320;

  var p2Health = new createjs.Text("Health", "20px Courier", "white");
  p2Health.x = 270;
  p2Health.y = 386;

  var p2Magic = new createjs.Text("Magic", "20px Courier", "white");
  p2Magic.x = 270;
  p2Magic.y = 452;

  var p3Name = new createjs.Text("Player 3", "26px Courier", "white");
  p3Name.x = 470;
  p3Name.y = 320;

  var p3Health = new createjs.Text("Health", "20px Courier", "white");
  p3Health.x = 470;
  p3Health.y = 386;

  var p3Magic = new createjs.Text("Magic", "20px Courier", "white");
  p3Magic.x = 470;
  p3Magic.y = 452;

  var p4Name = new createjs.Text("Player 4", "26px Courier", "white");
  p4Name.x = 670;
  p4Name.y = 320;

  var p4Health = new createjs.Text("Health", "20px Courier", "white");
  p4Health.x = 670;
  p4Health.y = 386;

  var p4Magic = new createjs.Text("Magic", "20px Courier", "white");
  p4Magic.x = 670;
  p4Magic.y = 452;

  var player1 = new createjs.Shape();
  player1.graphics.beginFill("#000000").drawRect(35, 300, 200, 200);
  player1.graphics.beginFill("#ff0000").drawRect(35, 367, 200, 66);
  player1.graphics.beginFill('blue').drawRect(35, 433, 200, 67);

  var player2 = new createjs.Shape();
  player2.graphics.beginFill("#000000").drawRect(245, 300, 200, 200);
  player2.graphics.beginFill("#ff0000").drawRect(245, 367, 200, 66);
  player2.graphics.beginFill('blue').drawRect(245, 433, 200, 67);

  var player3 = new createjs.Shape();
  player3.graphics.beginFill("#000000").drawRect(455, 300, 200, 200);
  player3.graphics.beginFill("#ff0000").drawRect(455, 367, 200, 66);
  player3.graphics.beginFill('blue').drawRect(455, 433, 200, 67);

  var player4 = new createjs.Shape();
  player4.graphics.beginFill("#000000").drawRect(665, 300, 200, 200);
  player4.graphics.beginFill("#ff0000").drawRect(665, 367, 200, 66);
  player4.graphics.beginFill('blue').drawRect(665, 433, 200, 67);

  stage.addChild(enemy);

  stage.addChild(player1);
  stage.addChild(p1Name);
  stage.addChild(p1Health);
  stage.addChild(p1Magic);

  stage.addChild(player2);
  stage.addChild(p2Name);
  stage.addChild(p2Health);
  stage.addChild(p2Magic);

  stage.addChild(player3);
  stage.addChild(p3Name);
  stage.addChild(p3Health);
  stage.addChild(p3Magic);

  stage.addChild(player4);
  stage.addChild(p4Name);
  stage.addChild(p4Health);
  stage.addChild(p4Magic);

  createjs.Ticker.addEventListener("tick", tick);
  createjs.Ticker.setInterval(200);

  function tick() {
    stage.update();
  }
}
