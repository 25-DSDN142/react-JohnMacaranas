//pinch threshold
let timeToPress = 5000;
let startOfPress = 0;
let progress = 0;

//accessory arrays
let glassesArray = [];
let mustacheArray = [];
let hatArray = [];
let a = 1;
let b = 1;
let c = 1;

//accessory visibility
let glassesVis = false;
let mustacheVis = false;
let hatVis = false;

//start button
let button;
let start = false;

//timer
let timerStart;
let timerDuration = 30;
let timer = timerDuration;
let countDown;

//photos
let numPhotos;
let photo = false;
let snap = 0;
let snapPhoto = false;

//misc
let cursor = true;
let uiMenu = [];
let m = 0;
// ----=  HANDS  =----
function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
  uiMenu.push(loadImage('/images/FinalAssets/startmenu.png'));
  uiMenu.push(loadImage('/images/FinalAssets/selectui.png'));
  uiMenu.push(loadImage('/images/FinalAssets/ui.png'));
  ArrowL = loadImage('/images/FinalAssets/arrowLeft.png');
  ArrowR = loadImage('/images/FinalAssets/arrowRight.png');
  SelectArrowL = loadImage('/images/FinalAssets/SelectarrowLeft.png');
  SelectArrowR = loadImage('/images/FinalAssets/SelectarrowRight.png');
  glassesArray.push(loadImage('/images/Proto/blank.png'));
  glassesArray.push(loadImage('/images/FinalAssets/nerdGlasses.png'));
  glassesArray.push(loadImage('/images/FinalAssets/mlgGlasses.png'));
  glassesArray.push(loadImage('/images/FinalAssets/snowGlasses.png'));
  glassesArray.push(loadImage('/images/FinalAssets/sunGlasses.png'));
  mustacheArray.push(loadImage('/images/Proto/blank.png'));
  mustacheArray.push(loadImage('/images/FinalAssets/goateeMustache.png'));
  mustacheArray.push(loadImage('/images/FinalAssets/handleMustache.png'));
  mustacheArray.push(loadImage('/images/FinalAssets/classicMustache.png'));
  mustacheArray.push(loadImage('/images/FinalAssets/beardMustache.png'));
  hatArray.push(loadImage('/images/Proto/blank.png'));
  hatArray.push(loadImage('/images/FinalAssets/capHat.png'));
  hatArray.push(loadImage('/images/FinalAssets/leafHat.png'));
  hatArray.push(loadImage('/images/FinalAssets/topHat.png'));
  hatArray.push(loadImage('/images/FinalAssets/crownHat.png'));
  hatButton = loadImage('/images/FinalAssets/hatButton.png');
  PressedhatButton = loadImage('/images/FinalAssets/PressedhatButton.png');
  glassesButton = loadImage('/images/FinalAssets/glassesButton.png');
  PressedglassesButton = loadImage('/images/FinalAssets/PressedglassesButton.png');
  mustacheButton = loadImage('/images/FinalAssets/mustacheButton.png');
  PressedmustacheButton = loadImage('/images/FinalAssets/PressedmustacheButton.png');

  startButton();
}

function drawInteraction(faces, hands) {

  //photos and timer
if(start == true){
  // hands part
  // USING THE GESTURE DETECTORS (check their values in the debug menu)
  // detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (showKeypoints) {
      drawPoints(hand)
      drawConnections(hand)
    }
    // console.log(hand);
    let middleFingerMcpX = hand.middle_finger_mcp.x;
    let middleFingerMcpY = hand.middle_finger_mcp.y;

    let indexFingerTipX = hand.index_finger_tip.x;
    let indexFingerTipY = hand.index_finger_tip.y;
    let thumbTipX = hand.thumb_tip.x;
    let thumbTipY = hand.thumb_tip.y;

    let x = (indexFingerTipX + thumbTipX) * 0.5; // find half way between the index and thumn
    let y = (indexFingerTipY + thumbTipY) * 0.5;
    /*
    Start drawing on the hands here
    */
    if (cursor === true){
      ellipse(x, y, 20, 20);
    }
    //accessory visibility
    let whatGesture = detectHandGesture(hand);
  
    if(x > 1054 && x <= 1260 && y > 123 && y <= 360){ //hat visibility
      if (whatGesture == 'Pinch'){
      startOfPress = millis();
        if (startOfPress > 0 && progress < 10){                
          progress = startOfPress / timeToPress * 100;       

          if (progress >= 10){
            hatVis = !hatVis;

          }
        }
      } else {
        startOfPress = 0;
        progress = 0;
      }
    } 
    
    if(x > 1054 && x <= 1260 && y > 396 && y <= 600){ //glasses visibility
      if (whatGesture == 'Pinch'){
      startOfPress = millis();
        if (startOfPress > 0 && progress < 10){                
          progress = startOfPress / timeToPress * 100;       

          if (progress >= 10){
            glassesVis = !glassesVis;
          }
        }
      } else {
        startOfPress = 0;
        progress = 0;
      }
    } 

    if(x > 1054 && x <= 1260 && y > 660 && y <= 884){ //mustache visibility
      if (whatGesture == 'Pinch'){
      startOfPress = millis();
        if(startOfPress > 0 && progress < 10){                
          progress = startOfPress / timeToPress * 100;       

          if(progress >= 10){
            mustacheVis = !mustacheVis;
          }
        }
      } else {
        startOfPress = 0;
        progress = 0;
      }
    } 
    //accessory cycling
    //cursor
    if (hatVis || glassesVis || mustacheVis === true){
      cursor = false;
      if(hand.handedness == 'Left'){
        rectMode(CENTER);
        image(ArrowL, x, y);
      }
      if(hand.handedness == 'Right'){
        rectMode(CENTER);
        image(ArrowR, x ,y);
      }

      if(whatGesture == 'Pinch' && hand.handedness == 'Right'){ //some code sourced from:
        startOfPress = millis();                               //https://stackoverflow.com/questions/69524578/measuring-how-long-a-key-is-pressed-using-p5-js-and-javascript
        image(SelectArrowR, x, y);
        if(startOfPress > 0 && progress < 20){                //this detects if pinching with right hand
          progress = startOfPress / timeToPress * 100;       //which will then increase the array by 1
        
          if(progress >= 20){
              if (y > 123 && y <= 380) {
              a = (a + 1) % hatArray.length;
            } else if (y > 380 && y <= 636) {
              b = (b + 1) % glassesArray.length;
            } else if(y > 636 && y <= 880) {
              c = (c + 1) % mustacheArray.length;
            }
        }
        }
      } else if (whatGesture == 'Pinch' && hand.handedness == 'Left'){ //this detects if pinching with left hand
        startOfPress = millis();                                      //which will decrease the array by 1
        image(SelectArrowL, x, y);
        if(startOfPress > 0 && progress < 20){
          progress = startOfPress / timeToPress * 100;
        
          if(progress >= 20){ 
            if(y > 123 && y <= 380) { //this detects the y value and decreases the array of the corresponding accessory
            a = a - 1
            if(a < 0){
              a = hatArray.length - 1; //hat
            }
          } else if (y > 380 && y <= 636){
            b = b - 1
            if(b < 0){
              b = glassesArray.length - 1; //glasses
            }
          } else if (y > 636 && y <= 880){
            c = c - 1
            if(c < 0){
              c = mustacheArray.length - 1; //mustache
            }
          }
          } 
        }
      } else {
        startOfPress = 0;
        progress = 0;
      }
    } else {
      cursor = true;
    }

      /*
      Stop drawing on the hands here
    */
  }
  //------------------------------------------------------------
  //facePart
  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
    if (showKeypoints) {
      drawPoints(face)
    }
    /*
    Start drawing on the face here
    */
    let faceWidth = face.faceOval.width;
    let faceHeight = face.faceOval.height;
    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;

    let leftEyeCenterX = face.leftEye.centerX;
    let leftEyeCenterY = face.leftEye.centerY;
    let rightEyeCenterX = face.rightEye.centerX;
    let rightEyeCenterY = face.rightEye.centerY;

    let scaleX = faceWidth / 640;
    let scaleY = faceHeight / 480;

    let rotateAmount;

    let dy = leftEyeCenterY - rightEyeCenterY;
    let dx = leftEyeCenterX - rightEyeCenterX;

    let fE = face.keypoints[234];


    rotateAmount = Math.atan2(dy, dx);


    if(hatVis === true){
      push();
        imageMode(CENTER);
        translate(faceCenterX+(rotateAmount*2), faceCenterY-faceHeight);
        rotate(rotateAmount);
        image(hatArray[a], 0, 0, faceWidth, faceHeight);
      pop();
    }

    if(glassesVis === true){ //glasses
      let tLx = face.keypoints[127];
      let tLy = face.keypoints[10];
      let bRx = face.keypoints[356];
      let bRy = face.keypoints[410];
      push();
        translate(tLx.x, tLy.y);
        rotate(rotateAmount);
        image(glassesArray[b], 0, 0, faceWidth, faceHeight/1.5);
      pop();
    }

    if(mustacheVis == true){ //mustache
      let mc = face.keypoints[0];
      push();
        imageMode(CENTER);
        translate(mc.x, mc.y);
        rotate(rotateAmount);
        image(mustacheArray[c], 0, 0, faceWidth, faceHeight/1.5);
      pop();
    }
    /*
    Stop drawing on the face here
    */
  }
    
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 
} 
//snapshot
if(m === 2){
  if(snapPhoto == true){
    takePhoto();
  }
}
//ui
image(uiMenu[m], 0, 0);

//ui buttons + start timer
if(m === 2){
  startTimer();
  if(hatVis == true){
    image(PressedhatButton, 1081, 142);
  } else {
    image(hatButton, 1081, 142);
  }
  if(glassesVis == true){
    image(PressedglassesButton, 1081, 391);
  } else {
    image(glassesButton, 1081, 391);
  }
  if(mustacheVis == true){
    image(PressedmustacheButton, 1081, 638);
  } else {
    image(mustacheButton, 1081, 638);
  }
}
}
function drawConnections(hand) {
  // Draw the skeletal connections
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}
function pinchCircle(hand) { // adapted from https://editor.p5js.org/ml5/sketches/DNbSiIYKB
  // Find the index finger tip and thumb tip
  let finger = hand.index_finger_tip;
  //let finger = hand.pinky_finger_tip;
  let thumb = hand.thumb_tip;

  // Draw circles at finger positions
  let centerX = (finger.x + thumb.x) / 2;
  let centerY = (finger.y + thumb.y) / 2;
  // Calculate the pinch "distance" between finger and thumb
  let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  // This circle's size is controlled by a "pinch" gesture
  fill(0, 255, 0, 200);
  stroke(0);
  strokeWeight(2);
  circle(centerX, centerY, pinch);

}
function drawPoints(feature) {

  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop()

}
function startButton(){
  let col = color(91, 186, 111);
  let Dcol = color(45, 153, 111);
  let Tcol = color(3, 25, 38);
  button = createButton("START");
  button.mouseClicked(photoSelect);
  button.size(400,180, 20);
  button.position(815, 721);
  button.style("color", Tcol);
  button.style("font-family", "Verdana", "bold");
  button.style("font-size", "72px");
  button.style("background-color", col);
  button.style("cursor", "pointer");
  button.style("border-width", "20px");
  button.style("border-color", Dcol);
  button.style("border-radius", "60px");
}
function photoSelect(){
  m = m + 1;
  button.remove();
  button1x = createImg("/images/FinalAssets/1x.png");
  button1x.mouseClicked(x1Photo);
  button1x.position(611, 275);
  button1x.style("cursor", "pointer");

  button2x = createImg("/images/FinalAssets/3x.png");
  button2x.mouseClicked(x3Photo);
  button2x.position(934, 275);
  button2x.style("cursor", "pointer");

  button4x = createImg("/images/FinalAssets/4x.png");
  button4x.mouseClicked(x4Photo);
  button4x.position(627, 561);
  button4x.style("cursor", "pointer");
  
  button6x = createImg("/images/FinalAssets/6x.png");
  button6x.mouseClicked(x6Photo);
  button6x.position(905, 561);
  button6x.style("cursor", "pointer");
}
function x1Photo(){
  button1x.remove();
  button2x.remove();
  button4x.remove();
  button6x.remove();
  numPhotos = 1;
  m = m + 1;
  start = !start;
  timerStart = millis();
  resetButton();
}
function x3Photo(){
  button1x.remove();
  button2x.remove();
  button4x.remove();
  button6x.remove();
  numPhotos = 3;
  m = m + 1;
  start = !start;
  timerStart = millis();
  resetButton();
}
function x4Photo(){
  button1x.remove();
  button2x.remove();
  button4x.remove();
  button6x.remove();
  numPhotos = 4;
  m = m + 1;
  start = !start;
  timerStart = millis();
  resetButton();
}
function x6Photo(){
  button1x.remove();
  button2x.remove();
  button4x.remove();
  button6x.remove();
  numPhotos = 6;
  m = m + 1;
  start = !start;
  timerStart = millis();
  resetButton();
}
function startTimer(){
    let currentTime = millis();
    countDown = timer - int((currentTime-timerStart)/1000);
    let timerDisplay = [countDown, timerDuration];
    let d = 0;

    if(countDown === 0 && !photo){
      snapPhoto = true;
      photo = true;
      snap = snap + 1;
      // console.log('SNAP');
    } 
    if(countDown < 0 && snap < numPhotos){
      resetTimer();
    } 
    if(snap >= numPhotos){
      d = d+1;
    }

    push();
      fill(0);
      textFont('Verdana');
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      textSize(72);
      text(timerDisplay[d], 131, 175);
    pop();
}
function resetTimer(){
  photo = false;
  d = 0
  timerStart = millis();
}
function takePhoto(){
  saveCanvas('Photobooth' + frameCount, 'png');
  snapPhoto = false;
  console.log('SNAP');
}
function resetButton(){
  let col = color(107, 39, 55);
  let Dcol = color(86, 26, 55);
  buttonReset = createButton("RESET");
  buttonReset.mouseClicked(resetStart);
  buttonReset.size(177,100);
  buttonReset.position(37, 760);
  buttonReset.style("color", "white");
  buttonReset.style("font-family", "Verdana", "bold");
  buttonReset.style("font-size", "36px");
  buttonReset.style("background-color", Dcol);
  buttonReset.style("cursor", "pointer");
  buttonReset.style("border-width", "10px");
  buttonReset.style("border-color", col);
  buttonReset.style("border-radius", "20px");
}
function resetStart(){
  window.location.reload();
}