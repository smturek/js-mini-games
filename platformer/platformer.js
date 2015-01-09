function init() {
  var stage = new createjs.Stage("demoCanvas");
  var circle = new createjs.Shape();
  var rectangle = new createjs.Shape();
  circle.graphics.beginFill("Blue").drawCircle(0, 0, 50);
  rectangle.graphics.beginFill("Green").drawRect(0,400,900, 100);
  circle.x = 0;
  circle.y = 350;
  stage.addChild(circle);
  stage.addChild(rectangle);

  createjs.Ticker.addEventListener("tick", tick);
  createjs.Ticker.setInterval(15);

  function tick() {
    circle.x = circle.x + 3;
    if (circle.x > stage.canvas.width + 50) { circle.x = 0; }
    stage.update();
  }
}
