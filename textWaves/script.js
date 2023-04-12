// READABILITY ALGO
let gradeLevel;
let textGlobal;
let splitText;
let myDiv;
let input;
let button;

function calculateReadability(text) {
  // Tokenize sentences
  let sentences = text.split(/[.!?]/);

  // Tokenize words
  let words = text.split(/[^\w']+/);

  // Count number of sentences, words, and syllables
  let numSentences = sentences.length;
  let numWords = words.length;
  let numSyllables = 0;
  for (let i = 0; i < numWords; i++) {
    let syls = countSyllables(words[i])
    if (syls){
    numSyllables += countSyllables(words[i]);}
    else{
      numSyllables+=1
    }
  }

  // Calculate grade level
  let gradeLevel = 0.39 * (numWords / numSentences) + 11.8 * (numSyllables / numWords) - 15.59;

  if (!gradeLevel) {
    return 7.01
  }
  return gradeLevel;
}

function countSyllables(word) {
  // Simple syllable counting algorithm
  // Count the number of vowel groups in the word
  let numVowelGroups;
  if (word.length > 0) {
    numVowelGroups = word.match(/[aeiouy]+/gi)
    if (numVowelGroups) {
      numVowelGroups = numVowelGroups.length;
    }
    // Subtract the number of silent vowel groups (those at the end of the word)
    if (numVowelGroups) {
      if (word.endsWith('e')) {
        numVowelGroups--;
      }
      if (word.endsWith('le')) {
        numVowelGroups++;
      }
    }
  }
  // Minimum of 1 syllable per word
  return Math.max(numVowelGroups, 1);
}

// --------------------------
// string splitter

// random return index
function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

// function to split text
function randomStringArray(text) {
  const words = text.split(' ');
  const result = [];

  while (words.length > 0) {
    const length = Math.floor(Math.random() * 2) + 2;
    const slicedWords = words.splice(0, length);
    const randomString = slicedWords.join(' ');
    result.push(randomString);
  }

  return result;
}

// visualizations

let yoffs = [0.001, 0.002, 0.003, 0.004];
let xoff = 0;
let zoff = 0;
let stars = [];
let clouds = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the text area and set its CSS style
  // Create the textarea element and set its CSS style
  input = createElement('textarea');
  input.class('my-textarea');
  input.style('background-color', 'grey');
  input.style('color', 'white');
  input.style('padding', '10px');
  input.style('border', 'none'); // Remove the border
  input.style('height', '150px'); // Make the text area taller
  input.attribute('placeholder', 'Input text and press the button to visualize readability');
  input.style('::placeholder', 'color: white');  // Make placeholder text white
  input.position(20, height / 2 - input.height / 2); // Position the text area in the middle left of the canvas
  // let myDiv = createDiv();
  myDiv = createDiv().parent(document.body);
  myDiv.class('myDiv');
  myDiv.style('color', 'white');
  myDiv.style('font-family', 'Courier');
  myDiv.style('font-size', '20px');
  myDiv.position(input.x, input.y - myDiv.height - 25);

  // console.log("Before position:", myDiv.position());
  // myDiv.position(input.x, input.y - myDiv.height - 50);
  // console.log("After position:", myDiv.position());

  // set the text of the div element to the value of myVariable
  // if (gradeLevel > 0) {
  //   myDiv.html("Grade reading level: " + gradeLevel);

  //   myDiv.style('color', 'white');
  //   myDiv.style('font-size', '24px');
  //   console.log("MY READING LEVEL", gradeLevel)
  //   myDiv.position(input.x, input.y - myDiv.height - 10);
  // }

  // Create the button and set its position
  button = createButton('Readability');
  button.position(input.x + input.width - button.width + 15, input.y + input.height + 25);


  // // Add event listener to the button
  // button.mousePressed(() => {
  //   // Get the text from the textarea
  //   const text = input.value();

  //   // Calculate grade level
  //   gradeLevel = calculateReadability(text);
  //   splitText = randomStringArray(text)
  //   textGlobal = text;


  //   // Log grade level to console for testing
  //   console.log('Grade level:', gradeLevel);
  // });

  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height / 2);
    let size = random(1, 3);
    stars.push({ x, y, size });
  }

  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height / 4);
    let size = random(50, 100);
    let speed = random(0.01, 0.05);
    clouds.push({ x, y, size, speed });
  }
}

function draw() {
  background(51, 10);

  myDiv.html("The waves change based on the readability of your text");

  if (gradeLevel) {
    myDiv.html("Grade reading level: " + gradeLevel);
    console.log("myDiv", gradeLevel, myDiv)

  }
  // Add event listener to the button
  button.mousePressed(() => {
    // Get the text from the textarea
    const text = input.value();

    // Calculate grade level
    gradeLevel = calculateReadability(text);
    splitText = randomStringArray(text)
    textGlobal = text;
    // Log grade level to console for testing
    console.log('Grade level:', gradeLevel);
  });

  // Draw stars
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    fill(255, random(200, 255));
    noStroke();
    ellipse(star.x, star.y, star.size);
  }

  // Draw clouds
  for (let i = 0; i < clouds.length; i++) {
    let cloud = clouds[i];
    fill(255, random(150, 200));
    noStroke();

    beginShape();
    let xoff = 0;
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let offset = map(noise(xoff, cloud.y * 0.01, zoff), 0, 1, -cloud.size * 0.1, cloud.size * 0.1);
      let r = cloud.size * 0.5 + offset;
      let x = cloud.x + r * cos(a);
      let y = cloud.y + r * sin(a);
      curveVertex(x, y);
      xoff += 0.1;
    }
    endShape(CLOSE);

    cloud.x += cloud.speed;
    if (cloud.x > width + cloud.size) {
      cloud.x = -cloud.size;
    }

  }

  // Draw text waves
  textSize(16);
  for (let i = 0; i < yoffs.length; i++) {
    let yoff = yoffs[i];

    for (let x = 0; x <= width; x += 10) {
      let y = map(noise(xoff, yoff, zoff), 0, 1, 2 * height / 3, height / 6);
      if (gradeLevel) {
        y = y * gradeLevel
      }
      let textX = x + random(-20, 20);
      let textY = y + random(-10, 10) + height / 2;
      fill(255);
      let textToUse;
      if (splitText) {
        let randomIndex = getRandomIndex(splitText)
        textToUse = splitText[randomIndex]
      }
      else {
        textToUse = "random word"
      }
      text(textToUse, textX, textY);
      xoff += 0.05;
      zoff += 0.09;
    }
  }
}
