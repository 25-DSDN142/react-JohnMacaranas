let timeToPress = 5000;
let startOfPress = 0;
let progress = 0;
let timeToPress2 = 5000;
let startOfPress2 = 0;
let progress2 = 0;
let timeToPress3 = 5000;
let startOfPress3 = 0;
let progress3 = 0;
let glassesArray = [];
let mustacheArray = [];
let hatArray = [];
let a = 1;
let b = 1;
let c = 1;

//accessory visibility
let vis = false;
let glassesVis = false;
let hatVis = true;

//start button
let button;
let start = false;

//timer
let timerStart;
let timerDuration = 10;
let timer = timerDuration;
let countDown;


//photos
let photoDisplay = [];
let numPhotos;
let photo = false;
let snap = 0;
let px = 40;
let py = 400;
let pw = 186;
let ph = 140;
// ----=  HANDS  =----
function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
  UI = loadImage('/images/Proto/ui.png');
  ArrowL = loadImage('/images/Proto/arrowL.png');
  ArrowR = loadImage('/images/Proto/arrowR.png');
  SelectArrowL = loadImage('/images/Proto/arrowSelectL.png');
  SelectArrowR = loadImage('/images/Proto/arrowSelectR.png');
  glassesArray.push(loadImage('/images/Proto/blank.png'));
  glassesArray.push(loadImage('/images/Proto/glasses.png'));
  glassesArray.push(loadImage('/images/Proto/glasses2.png'));
  mustacheArray.push(loadImage('/images/Proto/blank.png'));
  mustacheArray.push(loadImage('/images/Proto/moustache.png'));
  mustacheArray.push(loadImage('/images/Proto/goatee.png'));
  hatArray.push(loadImage('/images/Proto/blank.png'));
  hatArray.push(loadImage('/images/Proto/hat.png'));
  hatArray.push(loadImage('/images/Proto/cap.png'));
  selectIcons = loadImage('images/Proto/iconSelect.png');

  
  startButton();
}

function drawInteraction(faces, hands) {

  //photos and timer
if(start == true){
  image(UI, 0, 0);
  
  //TIMER 
  startTimer();

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
    let whatGesture = detectHandGesture(hand);
      // console.log(vis);
  
    if(x > 920 && x <= 1230 && y > 180 && y <= 450){ //glasses visibility
      if(whatGesture == 'Pinch'){
      startOfPress = millis();
        if(startOfPress > 0 && progress < 10){                
          progress = startOfPress / timeToPress * 100;       

          if(progress >= 10){
            toggleHat();
          }
        }
      }
    } 
    if(vis == true){
      glassesAsset();
    }
    
    if(x > 920 && x <= 1230 && y > 475 && y <= 745){ //mustache visibility
      if(whatGesture == 'Pinch'){
      startOfPress2 = millis();
        if(startOfPress2 > 0 && progress2 < 10){                
          progress2 = startOfPress2 / timeToPress2 * 100;       

          if(progress2 >= 10){
            toggleBVis();
          }
        }
      }
    }
    if(glassesVis == true){
      mustacheAsset();
    }

    
    /*
    Stop drawing on the hands here
    */
  }
  // console.log(bvis);
 
  //------------------------------------------------------------
  //facePart
  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
    if (showKeypoints) {
      drawPoints(face)
    }
    // console.log(face);
    /*
    Once this program has a face, it knows some things about it.
    This includes how to draw a box around the face, and an oval. 
    It also knows where the key points of the following parts are:
     face.leftEye
     face.leftEyebrow
     face.lips
     face.rightEye
     face.rightEyebrow
    */

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


    if(hatVis == true){
      push();
        imageMode(CENTER);
        translate(faceCenterX+(rotateAmount*2), faceCenterY-faceHeight);
        rotate(rotateAmount);
        image(hatArray[a], 0, 0);
      pop();
    }


    if(vis == true){ //glasses
      push();
        imageMode(CENTER);
        translate(faceCenterX, faceCenterY);
        rotate(rotateAmount);
        image(glassesArray[a], 0, 0, faceWidth, faceHeight);
      pop();
    }

    if(glassesVis == true){ //mustache
      push();
        imageMode(CENTER);
        translate(faceCenterX, faceCenterY);
        rotate(rotateAmount);
        image(mustacheArray[a], 0, 0, faceWidth, faceHeight);
      pop();
    }
    // rect(face.faceOval.centerX, face.faceOval.centerY, face.faceOval.width, face.faceOval.height);
    /*
    Stop drawing on the face here
    */

  }
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 
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


// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
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
function hatAsset(){
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
    let whatGesture = detectHandGesture(hand);
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
                a = (a + 1) % hatArray.length;

                // console.log(progress);
              }
            }
          } else if (whatGesture == 'Pinch' && hand.handedness == 'Left'){ //this detects if pinching with left hand
            startOfPress = millis();                                      //which will decrease the array by 1
            image(SelectArrowL, x, y);
            if(startOfPress > 0 && progress < 20){
              progress = startOfPress / timeToPress * 100;
            
              if(progress >= 20){
                a = a - 1
                if(a < 0){
                  a = hatArray.length - 1;
                }
                // console.log(progress);
              } 
            }
          } else {
         startOfPress = 0;
         progress = 0;
          }
}
}
function glassesAsset(){
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
    let whatGesture = detectHandGesture(hand);
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
                a = (a + 1) % glassesArray.length;

                // console.log(progress);
              }
            }
          } else if (whatGesture == 'Pinch' && hand.handedness == 'Left'){ //this detects if pinching with left hand
            startOfPress = millis();                                      //which will decrease the array by 1
            image(SelectArrowL, x, y);
            if(startOfPress > 0 && progress < 20){
              progress = startOfPress / timeToPress * 100;
            
              if(progress >= 20){
                a = a - 1
                if(a < 0){
                  a = glassesArray.length - 1;
                }
                // console.log(progress);
              } 
            }
          } else {
         startOfPress = 0;
         progress = 0;
          }
}
}
function mustacheAsset(){
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
    let whatGesture = detectHandGesture(hand);
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
                a = (a + 1) % mustacheArray.length;

                console.log(progress);
              }
            }
          } else if (whatGesture == 'Pinch' && hand.handedness == 'Left'){ //this detects if pinching with left hand
            startOfPress = millis();                                      //which will decrease the array by 1
            image(SelectArrowL, x, y);
            if(startOfPress > 0 && progress < 20){
              progress = startOfPress / timeToPress * 100;
            
              if(progress >= 20){
                a = a - 1
                if(a < 0){
                  a = mustacheArray.length - 1;
                }
                console.log(progress);
              } 
            }
          } else {
         startOfPress = 0;
         progress = 0;
          }
  }
}
function startButton(){
  button = createButton("START");
  button.mouseClicked(photoSelect);
  button.size(200,100);
  button.position(540, 380);
  button.style("font-family", "Bodoni");
  button.style("font-size", "48px");
}
function photoSelect(){
  button.remove();
  button1 = createButton("x1");
  button1.mouseClicked(x1Photo);
  button1.size(100, 100);
  button1.position(380, 380);
  button1.style("font-family", "Bodoni");
  button1.style("font-size", "48px");
  button2 = createButton("x3");
  button2.mouseClicked(x3Photo);
  button2.size(100, 100);
  button2.position(490, 380);
  button2.style("font-family", "Bodoni");
  button2.style("font-size", "48px");
  button3 = createButton("x5");
  button3.mouseClicked(x5Photo);
  button3.size(100, 100);
  button3.position(600, 380);
  button3.style("font-family", "Bodoni");
  button3.style("font-size", "48px");

}
function x1Photo(){
  button1.remove();
  button2.remove();
  button3.remove();
  numPhotos = 1;
  start = !start;
  timerStart = millis();
}
function x3Photo(){
  button1.remove();
  button2.remove();
  button3.remove();
  numPhotos = 3;
  start = !start;
  timerStart = millis();
}
function x5Photo(){
  button1.remove();
  button2.remove();
  button3.remove();
  numPhotos = 5;
  start = !start;
  timerStart = millis();
}
function startTimer(){
    let currentTime = millis();
    countDown = timer - int((currentTime-timerStart)/1000);
    let timerDisplay = [countDown, timerDuration];
    let b = 0;

    if(countDown === 0 && !photo){
    // saveCanvas('Photobooth' + frameCount, 'png');
    photo = true;
    snap = snap + 1;
    console.log('SNAP');
    // saveCanvas('ml5-capture-' + frameCount, 'png');

    } 
    if(countDown < 0 && snap < numPhotos){
      resetTimer();
    } 
    if(snap >= numPhotos){
      b = b+1;
    }

    push();
      textSize(60);
      text(timerDisplay[b], 100, 100);
    pop();
  
  
  
}
function pauseTimer(){
  timerDisplay = 10;
}
function resetTimer(){
  photo = false;  
  timerStart = millis();
}
function toggleHat(){
  vis = !vis;
}
function toggleBVis(){
  glassesVis = !glassesVis;
  console.log(glassesVis);
}