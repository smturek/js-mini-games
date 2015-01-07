var imageRepository = new function() {
  this.background = new Image();
  this.spaceship = new Image();
  this.bullet = new Image();
  // Ensure all images have loaded before starting the game
  var numImages = 3;
  var numLoaded = 0;
  function imageLoaded() {
    numLoaded++;
    if (numLoaded === numImages) {
      window.init();
    }
  }
  this.background.onload = function() {
    imageLoaded();
  }
  this.spaceship.onload = function() {
    imageLoaded();
  }
  this.bullet.onload = function() {
    imageLoaded();
  }
  this.background.src = "imgs/bg.png";
  this.spaceship.src = "imgs/ship.png";
  this.bullet.src = "imgs/bullet.png";
}

function Drawable() {
  this.init = function(x, y, width, height) {
    // Default variables
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  this.speed = 0;
  this.canvasWidth = 0;
  this.canvasHeight = 0;
  // Define abstract function to be implemented in child objects
  this.draw = function() {
  };
}

function Background() {
  this.speed = 1; // Redefine speed of the background for panning
  // Implement abstract function
  this.draw = function() {
    // Pan background
    this.y += this.speed;
    this.context.drawImage(imageRepository.background, this.x, this.y);
    // Draw another image at the top edge of the first image
    this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
    // If the image scrolled off the screen, reset
    if (this.y >= this.canvasHeight)
      this.y = 0;
    };
  }
  // Set Background to inherit properties from Drawable
  Background.prototype = new Drawable();

  function Game() {
    /*
    * Gets canvas information and context and sets up all game
    * objects.
    * Returns true if the canvas is supported and false if it
    * is not. This is to stop the animation script from constantly
    * running on older browsers.
    */
    this.init = function() {
      // Get the canvas element
      this.bgCanvas = document.getElementById('background');
      // Test to see if canvas is supported
      if (this.bgCanvas.getContext) {
        this.bgContext = this.bgCanvas.getContext('2d');
        // Initialize objects to contain their context and canvas
        // information
        Background.prototype.context = this.bgContext;
        Background.prototype.canvasWidth = this.bgCanvas.width;
        Background.prototype.canvasHeight = this.bgCanvas.height;
        // Initialize the background object
        this.background = new Background();
        this.background.init(0,0); // Set draw point to 0,0
        return true;
      } else {
        return false;
      }
    };
    // Start the animation loop
    this.start = function() {
      animate();
    };
  }

  function animate() {
    requestAnimFrame( animate );
    game.background.draw();
  }
  /**
  * requestAnim shim layer by Paul Irish
  * Finds the first API that works to optimize the animation loop,
  * otherwise defaults to setTimeout().
  */
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(/* function */ callback, /* DOMElement */ element){
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  var game = new Game();
  function init() {
    if(game.init())
      game.start();
    }
