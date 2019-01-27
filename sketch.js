// Name: Kyle Kiyoshi Cortez
// Email: kylekiyoshicortez07@gmail.com
// Project: Snake (Video Game Genre)

let s = 10;
let snake;
let food;

function setup() {
	createCanvas(400, 400);
  frameRate(10);

	snake = new Snake();
	food = new Food();
}

function draw() {
  background(0);
  
  snake.render();
  snake.update();
  food.render();
  
  if (snake.isDead()) {
    let score = snake.body.length;
    
		print("Game Over!");
    print("Score: ", score);
    noLoop();
  }
  
  if (food.isEaten()) {
		snake.grow();
    food.update();
  }
}

function keyPressed() {
	switch (keyCode) {
    case LEFT_ARROW:
      if (snake.body.length == 1 || snake.dir.x != s) {
				snake.setDirection(-s, 0);
      }
      break;
    case RIGHT_ARROW:
      if (snake.body.length == 1 || snake.dir.x != -s) {
				snake.setDirection(s, 0);
      }
      break;
    case UP_ARROW:
      if (snake.body.length == 1 || snake.dir.y != s) {
				snake.setDirection(0, -s);
      }
      break;
    case DOWN_ARROW:
      if (snake.body.length == 1 || snake.dir.y != -s) {
				snake.setDirection(0, s);
      }
      break;
  }
}

function Snake() {
	this.body = [];
	this.body[0] = createVector(s, s);
 	this.dir = createVector(0, 0);
  
  this.render = function() {
		fill(0, 255, 0);
    
    for (let i = 0; i < snake.body.length; i++) {
			rect(this.body[i].x, this.body[i].y, s, s);
    }
  }
  
  this.setDirection = function(x, y) {
		this.dir.x = x;
    this.dir.y = y;
  }
  
  this.update = function() {
    let head = this.body[0].copy();
    
    this.body.pop();
    head.x += this.dir.x;
    head.y += this.dir.y;
    this.body.unshift(head);
  }
  
  this.grow = function() {
		let head = this.body[0].copy();
    
    this.body.push(head);
  }
  
  this.isDead = function() {
		let x = snake.body[0].x;
    let y = snake.body[0].y;
    
    if (x < 0 || x > width - s || y < 0 || y > height - s) {
			return true;
    }
    
    for (let i = 1; i < snake.body.length; i++) {
			let part = snake.body[i];
      
      if (x == part.x && y == part.y) {
				return true;
      }
    }
    
    return false;
  }
}

function Food() {
	let x, y;
  let isColliding = true;
  
  while (isColliding) {
		x = floor(random(width / s)) * s;
    y = floor(random(height / s)) * s;
    isColliding = false;
    
    for (let i = 0; i < snake.body.length; i++) {
    	if (x == snake.body[i].x && y == snake.body[i].y) {
				isColliding = true;
        break;
      }
    }
  }
  
  this.pos = createVector(x, y);
  
  this.render = function() {
		fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, s, s);
  }
  
  this.isEaten = function() {
		let x = snake.body[0].x;
    let y = snake.body[0].y;
    
    return (this.pos.x == x && this.pos.y == y);
  }
  
  this.update = function() {
		food = new Food();
  }
}
