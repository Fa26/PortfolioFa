let particles = [];
let squiggliness = 10/100;

function setup() {
  let w = innerWidth;
  let h = innerHeight;
  if(w>700){
    createCanvas(displayWidth, displayHeight);

  }
  else{
    createCanvas(displayWidth, displayHeight);
    document.getElementById("pro").style.background="red";
    document.getElementById("fa").style.background="red";
  }
  colorMode(HSB, 255);
	noFill();
  background("black");
  //windowResized();
}

function draw() {
	beginShape();
  rectMode(CENTER)
  for (let p of particles) {
    p.draw();
    p.move();
  }
	endShape();
	if (frameCount < 632) {
		updateParticles(1, frameCount/10);
	} else if (frameCount > 1000) {
		noLoop();
	}
}

function updateParticles(r, theta0) {
	let n = 1;
  for (let i = 0; i < n; i++) {
		let theta = theta0 + map(i, 0, n, -PI, PI);
    let x_ = width/2 + r*cos(theta);
    let y_ = height/2 + r*sin(theta);
		let s_ = 1;
    let c_ = color(random(255), 255, 255);
    particles.push(new Particle(x_, y_, s_, c_));
  }
}

function Particle(x_, y_, s_, c_) {
  this.x = x_;
  this.y = y_;
  this.size = s_;
  this.c = c_;
  this.alpha = 1;
  this.dist = 3;
  
  this.move = function() {
		let theta = atan2(this.y - height/2, this.x - width/2);
		theta += noise(this.x * squiggliness, this.y * squiggliness)*2;
    let v = p5.Vector.fromAngle(theta, this.dist);
    this.x += v.x;
    this.y += v.y;
  }
  
  this.draw = function() {
		stroke(this.c);
    this.c.setAlpha(this.alpha);
		curveVertex(this.x, this.y);
    this.c.setAlpha(100);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight /2);
}

function touchStarted(){
  return false;
}

function touchMoved(){
  return false;
}

function touchEnded(){
  return false;
}