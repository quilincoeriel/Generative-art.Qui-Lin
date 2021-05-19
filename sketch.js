/* 👇 Start writing your p5.js code here */
// Bronnen:
// https://creative-coding.decontextualize.com/text-and-type/
// https://www.youtube.com/watch?v=76fiD5DvzeQ
// https://www.youtube.com/watch?v=u2D4sxh3MTs&t=2s
// Docent: Danny
// https://editor.p5js.org/p5/sketches/Motion:_Morph
// https://www.geeksforgeeks.org/p5-js-background-function/
// https://www.geeksforgeeks.org/p5-js-background-function/

// https://happycoding.io/tutorials/p5js/animation
// https://www.youtube.com/watch?v=HDn9zc8QYA4
// https://www.youtube.com/watch?v=OIfEHD3KqCg&t=67s
// https://p5js.org/examples/

let randColor;
var count=0;
var number = 0;
/* ------- var a ta pa rotation -------*/
var a = 0;
/* ------- Animation shape -------*/
let cirPath = [];
let triPath = [ ];
let square = [];
let spacing = 50;
let theta = 0;

function polarToCartesian (r, angle){
  return createVector(r * cos(angle), r*sin(angle));
}
/*--------- --- ---------*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  randColor= color(random(255),random(255),random(255));
  angleMode(DEGREES);
  background(randColor);

  /*------- animation shape ------ */
  let radius = 190;
  let startA = 0;
  let endA = 120;
  let start = polarToCartesian(radius, startA);
  let end = polarToCartesian(radius, endA);
  for ( let a = startA; a < 360; a += spacing){   // A ta pa Angle
    let x = radius * cos(a);
    let y = radius * sin(a);
    let cv = polarToCartesian(radius, a);
    cirPath.push(cv);
    let amt = (a % 120) / (endA - startA);
    let tv = p5.Vector.lerp(start, end, amt);
    triPath.push(tv);

    if ((a + spacing) % 120 === 0){
      startA = startA + 120;
      endA = endA + 120;
      start = polarToCartesian(radius, startA);
      end = polarToCartesian(radius, endA);
    }

}
}
function draw() {

  stroke(0);
  drawShapes();
  drawCircles();
  translate(width/2, height/2);
  rotate(a);
  noFill();
  fill(255, 255, 255);
  stroke(0);
  strokeWeight(0.3);
    // fill(random(0, 256), random(0, 256), random(0, 256));
  a = a + 1
  let amt = (sin(theta) + 1) /2 ;
  theta += 1;
  beginShape();
  for (let i = 0; i < cirPath.length; i++) {
    let cv = cirPath[i];
    let tv = triPath[i];
    let x = lerp(cv.x, tv.x, amt);
    let y = lerp(cv.y, tv.y, amt);
    vertex(x, y);
  }
  stroke(255,215,0);
  endShape(CLOSE);
}
function drawShapes() {
  for(let posX = 0; posX < 2; posX++)  {
    for(let posY = 0; posY < 2; posY++)  {
    beginShape();
    let spacing = map(mouseX, 0, width, 5, 100);
    for(let a = 0; a < 360; a += spacing) {
      let x = 100 * sin(a) + 200;
      let y = 100 * cos(a) + 200;
      vertex(x + posX * 500, y + posY * 500);
      // fill(random(0, 256), random(0, 256), random(0, 256));
    }
    endShape(CLOSE);
    fill(255, 255, 255);
    stroke(0);
    strokeWeight(0.3);
    }
  }
}
function drawCircles() {
  push();
  noStroke();
  let circleX = random(0, width);
  let circleY = random(0, height);
  fill(random(0, 256), random(0, 256), random(0, 256));
  ellipse(circleX, circleY, 20, 20);
  pop(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(randColor);
  randColor= color(random(255),random(255),random(255));

}
