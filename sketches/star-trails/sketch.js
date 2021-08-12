// star-trails
// author: rajeshkumar k

let NTRAILS = 450;
let MAX_RAD;
let DIM = 1080;
let FPS = 2;
let TR_CTR;
let GR_CTR;
let BLUE_LIM = ["#252a47", "#7882b5"];
let WHITE_LIM = ["#515257", "#f2f7fd"];
let GREY_LIM = ["#2d3538", "#98a1a6"];
let ORANGE_LIM = ["#403526", "#cc9761"];
let GRAD_LIGHT = ["#2a2733", "#232a44", "#005a9b", "#244371", "#436687"];
let GRAD_DARK = ["#040f1f", "#05083d", "#050619", "#131b2d", "#0c0f18"];
let TIME = 0.25;

function setup() {
  // createCanvas(DIM, DIM);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  canvas.style("display", "block");
  width = windowWidth;
  height = windowHeight;
  strokeCap(ROUND);
  noFill();
  noLoop();
  // frameRate(FPS);
  MAX_RAD = sqrt((width / 2) ** 2 + (height / 2) ** 2);
  trails(width / 2, height / 2, width / 2, height / 2, TIME);
}

function draw() {}

function mouseDragged() {
  TR_CTR = [mouseX, mouseY];
  GR_CTR = [mouseX * random(), mouseY * random()];
  trails(TR_CTR[0], TR_CTR[1], GR_CTR[0], GR_CTR[1], TIME);
}

function mousePressed() {
  TR_CTR = [mouseX, mouseY];
  GR_CTR = [mouseX * random(), mouseY * random()];
  trails(TR_CTR[0], TR_CTR[1], GR_CTR[0], GR_CTR[1], TIME);
}

function keyPressed() {
  if (keyCode == 82) {
    trails(width / 2, height / 2, width * random(), height * random(), TIME);
  } else if (keyCode == 83) {
    saveCanvas("star-trails", "png");
  }
}

function colorPicker(val) {
  first_random = random();
  let COL;
  if (first_random < 0.25) {
    COL = GREY_LIM;
  } else if (first_random < 0.5) {
    COL = BLUE_LIM;
  } else if (first_random < 0.8) {
    COL = WHITE_LIM;
  } else if (first_random >= 0.8) {
    COL = ORANGE_LIM;
  }
  return lerpColor(color(COL[0]), color(COL[1]), random());
}

function radialGradient(x, y, radius, col1, col2, order) {
  for (rad = 0; rad < radius; rad++) {
    t = (rad / radius) ** order;
    col = lerpColor(color(col1), color(col2), t);
    stroke(col);
    strokeWeight(4);
    noFill();
    circle(x, y, rad * 2);
  }
}

function trails(x, y, gx, gy, t) {
  MAX_RAD_GRAD = maxDistanceToCorner(gx, gy);
  background(0);
  lgrad = random(GRAD_LIGHT);
  dgrad = random(GRAD_DARK);
  radialGradient(gx, gy, MAX_RAD_GRAD, dgrad, lgrad, 1);
  MAX_RAD = maxDistanceToCorner(x, y);
  NTRAILS = NInterpolate(MAX_RAD, 400, 1000);
  for (var i = 0; i < NTRAILS; i++) {
    rad = random(MAX_RAD);
    start = random(0, 2 * PI);
    wgt = random(1, 3);
    strokeWeight(wgt);
    col = colorPicker(i);
    hcol = hue(col);
    scol = saturation(col);
    bcol = brightness(col);
    colorMode(HSB, 255);
    stroke(color(hcol, scol * 0.5, bcol * 0.85));
    ellipseMode(RADIUS);
    arc(x, y, rad, rad, start, start + 2 * PI * t * (rad / MAX_RAD));
  }
}

function NInterpolate(rad, min, max) {
  maxI = Distance(0, 0, width, height);
  return min + (rad / maxI) * (max - min);
}

function Distance(x1, y1, x2, y2) {
  return sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function maxDistanceToCorner(x, y) {
  return max([
    Distance(x, y, 0, 0),
    Distance(x, y, width, 0),
    Distance(x, y, 0, height),
    Distance(x, y, width, height),
  ]);
}
