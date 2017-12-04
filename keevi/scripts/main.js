var keyshold = [], keystopress = [], mods = [];
var userinput = "", keypressed = "";
var levelend = 0, unit = 100, gameover = 0, score = 0, levelcounter = 0;
var keycode, count, k, index, gamemsg;

document.onkeydown = function(e) {
	keycode = e.keyCode;
	keyshold.splice(0,0,e.keyCode);
	keyshold.sort();
	keypressed = String.fromCharCode(e.keyCode);
	userinput = userinput + String.fromCharCode(e.keyCode);
  console.log(score);

  if (e.keyCode == 27) {
    if (levelend == 1) {
      levelend = 0;
      keystopress = [];
      setup_level();
    } 
    if (gameover == 1) {
      keystopress = [];
      setup_level();
      score = 0;
      gameover = 0;
    }
  }
	// if (arraysEqual(keystopress, keyshold)) {
	// 	    levelend = 1;
	// }
}

// source: https://stackoverflow.com/questions/4025893/how-to-check-identical-array-in-most-efficient-way
function arraysEqual(arr1, arr2) {
  if(arr1.length !== arr2.length)
      return false;
  for(var i = arr1.length; i--;) {
      if(arr1[i] !== arr2[i])
          return false;
  }
  return true;
}

function setup_level() {
  var wideCount = width / unit;
  var highCount = 1;
  count = wideCount * highCount;
  var index = 0;
  for (var y = 0; y < highCount; y++) {
    for (var x = 0; x < wideCount; x++) {
      k = Math.floor(random(26))+65;
      keystopress.push(k);  
      mods[index++] = new Module(x*unit/1.1, y*unit, unit/2, unit/2, random(0.4, 0.8), unit, String.fromCharCode(k), 255); // increase this for levels
    }
  }
}

// 	p5js
function setup() {
  createCanvas(720, 360);
  noStroke();
  
  setup_level();
}

function draw() {
  if (levelend != 1 && gameover != 1) {
    background(255);
    fill(0);
    text("Type the keys before it reaches bottom of the screen.", 30, 20);
  	for (var i = 0; i < count; i++) {
  		mods[i].update();
  		mods[i].draw();
  	}
    fill(0);
    rect(1, 350, 720, 50);
  } else {
    background(0);
    fill(255);
    text(gamemsg, 250, 175);
    text("Press ESC to continue.", 250, 200);
    setup_level();
  }

}

function Module(_xOff, _yOff, _x, _y, _speed, _unit, _str, _color) {
  this.xOff = _xOff; // random this for levels
  this.yOff = _yOff;
  this.x = _x;
  this.y = _y;
  this.speed = _speed;
  this.unit = _unit;
  this.xDir = 1;
  this.yDir = 1; //increase this for levels
  this.str = _str;
  this.color = _color;
}

// Custom method for updating the variables
Module.prototype.update = function() {
  this.y = this.y + (this.speed * this.yDir);
  if (this.y > 340) {
    gameover = 1;
    gamemsg = "Game Over! Your Score is: " + score;
    this.yDir = 0;
  }
}

// Custom method for drawing the object
Module.prototype.draw = function() {
	fill(0);
	ellipse(this.xOff + this.x, this.yOff + this.y, 35, 35);
	if (keypressed == this.str) {
		if (this.color != 0) {
			this.color = 0;
			index = keystopress.indexOf(keypressed);
			keystopress.splice(index, 1);
			console.log(keystopress);
      this.yDir = 0;
      score = score + 100;
      keypressed = "";
	 }
  }
	fill(this.color);
	text(this.str, this.xOff + this.x - 4, this.yOff + 4 + this.y);
	if (keystopress.length == 0) {
		levelend = 1;
    gamemsg = "Well Played! Level Cleared! Your Score is: " + score;
	}
}