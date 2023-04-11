https://p5js.org/examples/math-noise-wave.html


let yoffs = [0.0, 0.01, 0.02, 0.03];
let numWaves = yoffs.length;
let waveColors = ['#FFFFFF', '#AAAAAA', '#555555', '#000000'];
// TEAR
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(16);
}

function draw() {
  background(51, 10);

  for (let i = 0; i < numWaves; i++) {
    let xoff = 0;
    let yoff = yoffs[i];

    for (let x = 0; x <= width; x += 10) {
      let y = map(noise(xoff, yoff), 0, 1, height, 0);
      let textX = x + random(-20, 20);
      let textY = y + random(-10, 10);
      let waveColor = color(waveColors[i]);
      fill(waveColor);
      text("random word", textX, textY);
      xoff += 0.05;
    }
  }
}


----------


let yoff = 0.0;
let yoffs = [0.001, 0.001, 0.001, 0.001]

// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   background(51, 10);

//   textSize(16);

//   let xoff = 0;
//   let zoff = 0
//   // WAVE 1
//   for (let x = 0; x <= width; x += 10) {
//     let y = map(noise(xoff, yoff, zoff), 0, 1, 2 * height / 3, height / 6)
//     // * 10; // multiply noise output by 10
//     let textX = x + random(-20, 20);
//     let textY = y + random(-10, 10) + height / 2; // adjust y position to be centered vertically
//     let gray = random(200, 255);
//     fill(255);
//     text("random word", textX, textY);
//     xoff += 0.05;
//     zoff += 0.09;

//   }

//   yoff += 0.001;

//   // wave 2
//   for (let x = 0; x <= width; x += 10) {
//     let y = map(noise(xoff, yoff, zoff), 0, 1, 2 * height / 3, height / 8)
//     // * 10; // multiply noise output by 10
//     let textX = x + random(-20, 20);
//     let textY = y + random(-10, 10) + height / 2; // adjust y position to be centered vertically
//     let gray = random(200, 255);
//     fill(255);
//     text("random word", textX, textY);
//     xoff += 0.05;
//     zoff += 0.09;

//   }

//   yoff += 0.001;



//   // wave 3
//   for (let x = 0; x <= width; x += 10) {
//     let y = map(noise(xoff, yoff, zoff), 0, 1, 2 * height / 3, height / 8)
//     // * 10; // multiply noise output by 10
//     let textX = x + random(-20, 20);
//     let textY = y + random(-10, 10) + height / 2; // adjust y position to be centered vertically
//     let gray = random(200, 255);
//     fill(255);
//     text("random word", textX, textY);
//     xoff += 0.05;
//     zoff += 0.09;

//   }

//   yoff += 0.001;



//   // wave 4
//   for (let x = 0; x <= width; x += 10) {
//     let y = map(noise(xoff, yoff, zoff), 0, 1, 2 * height / 3, height / 8)
//     // * 10; // multiply noise output by 10
//     let textX = x + random(-20, 20);
//     let textY = y + random(-10, 10) + height / 2; // adjust y position to be centered vertically
//     let gray = random(200, 255);
//     fill(255);
//     text("random word", textX, textY);
//     xoff += 0.01;
//     zoff += 0.09;

//   }

//   yoff += 0.001;
// }



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(51, 10);

  textSize(16);

  for (let i = 0; i <= yoffs.length; i += 1) {

    let xoff = 0;
    let zoff = 0
    // WAVE 1
    for (let x = 0; x <= width; x += 10) {
      let y = map(noise(xoff, yoff, zoff), 0, 1, 2 * height / 3, height / 6)
      let textX = x + random(-20, 20);
      let textY = y + random(-10, 10) + height / 2; // adjust y position to be centered vertically
      let gray = random(200, 255);
      fill(255);
      text("random word", textX, textY);
      xoff += 0.05;
      zoff += 0.09;

    }

    yoff += yoffs[i];
  }
}

----


let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

let engine = Engine.create();
let render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false
  }
});

let stars = [];

for (let i = 0; i < 100; i++) {
  stars.push(Bodies.circle(Math.random() * window.innerWidth, Math.random() * window.innerHeight / 3, 2, {
    render: {
      fillStyle: 'white'
    }
  }));
}

let clouds = [];

for (let i = 0; i < 10; i++) {
  clouds.push(Bodies.rectangle(Math.random() * window.innerWidth, Math.random() * window.innerHeight / 3, Math.random() * 200 + 100, Math.random() * 100 + 50, {
    render: {
      fillStyle: 'white'
    }
  }));
}

World.add(engine.world, stars);
World.add(engine.world, clouds);

Matter.Runner.run(engine);
Render.run(render);

// -------------

let yoffs = [0.001, 0.002, 0.003, 0.004];
let xoff = 0;
let zoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(51, 10);

  textSize(16);

  for (let i = 0; i < yoffs.length; i++) {
    let yoff = yoffs[i];

    // Wave
    for (let x = 0; x <= width; x += 10) {
      let y = map(noise(xoff, yoff, zoff), 0, 1, 2 * height / 3, height / 6);
      let textX = x + random(-20, 20);
      let textY = y + random(-10, 10) + height / 2;
      fill(255);
      text("random word", textX, textY);
      xoff += 0.05;
      zoff += 0.09;
    }
  }
}
