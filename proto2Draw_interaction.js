let timeToPress = 5000;
let startOfPress = 0;
let progress = 0;
// let testArray = ["Apple", "Banana", "Cherry", "DragonFruit", "Eggfruit","Fig","Grapes"];
let testArray = [];
let testArray2 = [];
let a = 0;
// let b;
// let testArrayGroup = [testArray, testArray2];

let button;
let timer = 5;
let start = false;
// ----=  HANDS  =----
function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
  ArrowL = loadImage('/images/Proto/arrowL.png');
  ArrowR = loadImage('/images/Proto/arrowR.png');
  SelectArrowL = loadImage('/images/Proto/arrowSelectL.png');
  SelectArrowR = loadImage('/images/Proto/arrowSelectR.png');
  testArray.push(loadImage('/images/Proto/glasses.png'));
  testArray.push(loadImage('/images/Proto/glasses2.png'));
  testArray2.push(loadImage('/images/Proto/moustache.png'));
  testArray2.push(loadImage('/images/Proto/goatee.png'));
  selectIcons = loadImage('images/Proto/iconSelect.png');

  
  button = createButton("START");
  button.mouseClicked(programStart);
  button.size(200,100);
  button.position(540, 380);
  button.style("font-family", "Bodoni");
  button.style("font-size", "48px");
  

}

function drawInteraction(faces, hands) {


if(start == true){
  image(selectIcons, 0, 0);
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

    if(whatGesture == 'Pinch' && x > 920 && x <= 1230 && y > 180 && y <= 450){ //glasses
      startOfPress = millis();
      if(startOfPress > 0 && progress < 20){                
        progress = startOfPress / timeToPress * 100;       

        if(progress >= 20){
          a = 0;
        }
      }
    } 
    if(whatGesture == 'Pinch' && x > 920 && x <= 1230 && y > 475 && y <= 745){ //glasses
      startOfPress = millis();
      if(startOfPress > 0 && progress < 20){                
        progress = startOfPress / timeToPress * 100;       

        if(progress >= 20){
          a = 1;
        }
      }
    } 

    
    /*
    Stop drawing on the hands here
    */
  }
  image(testArray[a], 0, 0);
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

    rotateAmount = Math.atan2(dy, dx);



// push();
// imageMode(CENTER);
// translate(faceCenterX, faceCenterY);
// rotate(rotateAmount);
// image(testArray[a], 0, 0);
// pop();
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

function programStart(){
  button.remove();
  start = !start;
  console.log('Button was pressed')
}

function glassesAsset(){
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
                a = (a + 1) % testArray.length;

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
                  a = testArray.length - 1;
                }
                console.log(progress);
              } 
            }
          } else {
         startOfPress = 0;
         progress = 0;
          }
}
function mustacheAsset(){
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
                a = (a + 1) % testArray.length;

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
                  a = testArray.length - 1;
                }
                console.log(progress);
              } 
            }
          } else {
         startOfPress = 0;
         progress = 0;
          }
}