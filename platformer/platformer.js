function init() {

  //drawn objects
  var stage = new createjs.Stage("demoCanvas");
  var circle = new createjs.Shape();
  var rectangle = new createjs.Shape();
  var sky = new createjs.Shape();
  var lava = new createjs.Shape();
  circle.graphics.beginFill("Blue").drawCircle(0, 0, 50);
  rectangle.graphics.beginFill("Green").drawRect(0,400,900, 100);
  lava.graphics.beginFill("Red").drawRect(900,380, 20, 20);
  sky.graphics.beginFill('#00FFFF').drawRect(0,0,900,400);
  circle.x = 0;
  circle.y = 350;
  //stage.addChild(circle);
  stage.addChild(rectangle);
  stage.addChild(sky);
  //stage.addChild(lava);

  //loaded images
  var cecil;

  //sprite sheet
  var spriteSheet = new createjs.SpriteSheet({framerate: 0,
    "images": ['imgs/Cecil.png'],
    "frames": {"regX": 0, "height": 75, "count": 20, "regY": 0, "width": 54, 'spacing': 7},
    // define two animations, run (loops, 1.5x speed) and jump (returns to run):
    "animations": {
      "run": [4, 5],
    }
  });
  cecil = new createjs.Sprite(spriteSheet, "run");
  cecil.y = 325;
  stage.addChild(cecil);

  //ticker
  createjs.Ticker.addEventListener("tick", tick);
  createjs.Ticker.setInterval(200);

  function tick() {
    circle.x = circle.x + 3;
    if (circle.x > stage.canvas.width + 50) { circle.x = 0; }
    cecil.x = cecil.x + 15;
    if (cecil.x > stage.canvas.width + 20) { cecil.x = 0; }
    lava.x = lava.x - 3;
    if (lava.x == 0 ) { lava.x = 900; }
    stage.update();
  }
}
