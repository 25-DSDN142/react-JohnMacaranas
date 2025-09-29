  let colours = [];
  let a = 1;

// ----=  HANDS  =----
// USING THE GESTURE DETECTORS (check their values in the debug menu)
// detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

/* load images here */
function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
  Arrow = loadImage('/images/Proto/arrow.png');
  SelectArrow = loadImage('/images/Proto/arrow select.png');
  colours.push(color(255, 0, 0)); //red
  colours.push(color(0, 255, 0)); //green
  colours.push(color(0, 0, 255)); //blue
  

}

function drawInteraction(faces, hands) {
// push();
// angleMode(DEGREES);
// translate(1040, 480);
// rotate(180);
// image(Arrow, -100, -100);
// pop();
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

    
    // if (whatGesture == "Peace") {
    //   fill(255, 38, 219) // pink
    // }
    // if (whatGesture == "Thumbs Up") {
    //   fill(255, 252, 48) // yellow
    // }
    // if (whatGesture == "Spidey"){
    //   fill(255, 0, 0); //red
      
    // }

    
    ellipse(x, y, 50);
    
    if(y >= 400 && y <= 660){ //checks if pointer is in the y range
      // console.log("cursor is in y range")
      if(x >= 20 && x <= 280){ //checks if pointer is in the x range [left arrow]
        // console.log("cursor is in x range")
        image(SelectArrow, 100, 480);
          if(whatGesture == 'Pinch'){
            a = (a + 1) % 3;
          } else {
            a = a;
          } 
        
      // } else if (y >= 200 && y <= 400){ //checks if pointer is in the y range
      //   console.log("cursor is in y range")
      //   push();
      //     fill(0, 255, 0);
      //     rect(0, 0, width, 100); //visual cue to tell you that you are in range
      //   pop();
      //   if(whatGesture == "Pinch"){
      //     console.log("user is pinching")
          
      //     fill(0, 255, 0); //fill green
          
      //   }
      } else {
        image(Arrow, 100, 480);
      }
    } else {
      image(Arrow, 100, 480);
    }

    let c = colours[a];
    fill(c);
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