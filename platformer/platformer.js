function init() {
  var stage = new createjs.Stage("demoCanvas");
  var circle = new createjs.Shape();
  circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
  circle.x = 450;
  circle.y = 300;
  stage.addChild(circle);
  stage.update();
}
