let timeToPress = 5000;
let startOfPress = 0;
let progress = 0;
let testArray = ["Apple", "Banana", "Cherry", "DragonFruit", "Eggfruit","Fig","Grapes"];
let a = 1;

// ----=  HANDS  =----
// USING THE GESTURE DETECTORS (check their values in the debug menu)
// detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

/* load images here */
function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
  Arrow = loadImage('/images/Proto/arrow.png');
  SelectArrow = loadImage('/images/Proto/arrow select.png');
  

}

function drawInteraction(faces, hands) {
text(testArray[a], 200, 300);

  // hands part
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // console.log(hand);
    if (showKeypoints) {
      drawConnections(hand)
    }

    let middleFingerMcpX = hand.middle_finger_mcp.x;
    let middleFingerMcpY = hand.middle_finger_mcp.y;

    /*
    Start drawing on the hands here
    */

    let indexFingerTipX = hand.index_finger_tip.x;
    let indexFingerTipY = hand.index_finger_tip.y;
    let thumbTipX = hand.thumb_tip.x;
    let thumbTipY = hand.thumb_tip.y;
    let x = (indexFingerTipX + thumbTipX) * 0.5; // find half way between the index and thumn
    let y = (indexFingerTipY + thumbTipY) * 0.5;

    let whatGesture = detectHandGesture(hand);

    if(whatGesture == 'Pinch' && hand.handedness == 'Right'){ //some code sourced from:
      startOfPress = millis();                               //https://stackoverflow.com/questions/69524578/measuring-how-long-a-key-is-pressed-using-p5-js-and-javascript
      if(startOfPress > 0 && progress < 20){
        progress = startOfPress / timeToPress * 100;

        if(progress >= 20){
          a = (a + 1) % testArray.length;

          console.log(progress);

        
        }
        
      }

    } else if (whatGesture == 'Pinch' && hand.handedness == 'Left'){
      startOfPress = millis();
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
    textSize(28);

    /*
    Stop drawing on the hands here
    */
  }
  // You can make addtional elements here, but keep the hand drawing inside the for loop. 
  //------------------------------------------------------
  

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

// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {
  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 10);
  }
  pop()

}