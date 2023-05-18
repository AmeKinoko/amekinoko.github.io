//☝️ to draw
//🖐 to erase
// <- 🤘 -> to pick colors

//I haven't figured out how to implement some kind of hand-tracking
// system that allows the user to keep track of where their hand actually
//is yet. Because I can't have a background appear in the Draw loop (it would
//cover up the actual drawings), anything that needs to be continuously
//created like that can't be erased. I'll have to think of another solution.

/* global describe p5 setup draw P2D WEBGL ARROW CROSS HAND MOVE TEXT WAIT HALF_PI PI QUARTER_PI TAU TWO_PI DEGREES RADIANS DEG_TO_RAD RAD_TO_DEG CORNER CORNERS RADIUS RIGHT LEFT CENTER TOP BOTTOM BASELINE POINTS LINES LINE_STRIP LINE_LOOP TRIANGLES TRIANGLE_FAN TRIANGLE_STRIP QUADS QUAD_STRIP TESS CLOSE OPEN CHORD PIE PROJECT SQUARE ROUND BEVEL MITER RGB HSB HSL AUTO ALT BACKSPACE CONTROL DELETE DOWN_ARROW ENTER ESCAPE LEFT_ARROW OPTION RETURN RIGHT_ARROW SHIFT TAB UP_ARROW BLEND REMOVE ADD DARKEST LIGHTEST DIFFERENCE SUBTRACT EXCLUSION MULTIPLY SCREEN REPLACE OVERLAY HARD_LIGHT SOFT_LIGHT DODGE BURN THRESHOLD GRAY OPAQUE INVERT POSTERIZE DILATE ERODE BLUR NORMAL ITALIC BOLD BOLDITALIC LINEAR QUADRATIC BEZIER CURVE STROKE FILL TEXTURE IMMEDIATE IMAGE NEAREST REPEAT CLAMP MIRROR LANDSCAPE PORTRAIT GRID AXES frameCount deltaTime focused cursor frameRate getFrameRate setFrameRate noCursor displayWidth displayHeight windowWidth windowHeight width height fullscreen pixelDensity displayDensity getURL getURLPath getURLParams pushStyle popStyle popMatrix pushMatrix registerPromisePreload camera perspective ortho frustum createCamera setCamera setAttributes createCanvas resizeCanvas noCanvas createGraphics blendMode noLoop loop push pop redraw applyMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate arc ellipse circle line point quad rect square triangle ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight bezier bezierDetail bezierPoint bezierTangent curve curveDetail curveTightness curvePoint curveTangent beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex alpha blue brightness color green hue lerpColor lightness red saturation background clear colorMode fill noFill noStroke stroke erase noErase createStringDict createNumberDict storeItem getItem clearStorage removeItem select selectAll removeElements createDiv createP createSpan createImg createA createSlider createButton createCheckbox createSelect createRadio createColorPicker createInput createFileInput createVideo createAudio VIDEO AUDIO createCapture createElement deviceOrientation accelerationX accelerationY accelerationZ pAccelerationX pAccelerationY pAccelerationZ rotationX rotationY rotationZ pRotationX pRotationY pRotationZ pRotateDirectionX pRotateDirectionY pRotateDirectionZ turnAxis setMoveThreshold setShakeThreshold isKeyPressed keyIsPressed key keyCode keyIsDown movedX movedY mouseX mouseY pmouseX pmouseY winMouseX winMouseY pwinMouseX pwinMouseY mouseButton mouseIsPressed requestPointerLock exitPointerLock touches createImage saveCanvas saveGif saveFrames loadImage image tint noTint imageMode pixels blend copy filter get loadPixels set updatePixels loadJSON loadStrings loadTable loadXML loadBytes httpGet httpPost httpDo createWriter save saveJSON saveJSONObject saveJSONArray saveStrings saveTable writeFile downloadFile abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt fract createVector noise noiseDetail noiseSeed randomSeed random randomGaussian acos asin atan atan2 cos sin tan degrees radians angleMode textAlign textLeading textSize textStyle textWidth textAscent textDescent loadFont text textFont append arrayCopy concat reverse shorten shuffle sort splice subset float int str boolean byte char unchar hex unhex join match matchAll nf nfc nfp nfs split splitTokens trim day hour minute millis month second year plane box sphere cylinder cone ellipsoid torus orbitControl debugMode noDebugMode ambientLight specularColor directionalLight pointLight lights lightFalloff spotLight noLights loadModel model loadShader createShader shader resetShader normalMaterial texture textureMode textureWrap ambientMaterial emissiveMaterial specularMaterial shininess remove canvas drawingContext*/

let handpose;
let video;
let predictions = [];

let brain;
let poseLabel;
let myColor;

let state = "waiting";
let targetLabel;
// let poseLabel = "T";

function setup() {
  let canvas = createCanvas(1300, 480);
  canvas.elt.style.position = "relative";
  canvas.style("z-index", "20");
  canvas.parent("canvasHolder");
  video = createCapture(VIDEO);
  video.parent("videoHolder");
  video.elt.style.position = "relative";
  video.hide();
  handpose = ml5.handpose(video, modelLoaded);
  handpose.on("predict", (results) => {
    predictions = results;
  });

  let options = {
    inputs: 42,
    outputs: 4,
    task: "classification",
    debug: true,
  };
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };
  brain.load(modelInfo, brainLoaded);
  colorMode(HSB);
  myColor = 360;
  background(0, 0, 100);
}

function brainLoaded() {
  console.log("pose classification ready!");
  classifyPose();
}

function classifyPose() {
  if (predictions.length > 0) {
    let inputs = [];
    for (let j = 0; j < predictions[0].landmarks.length; j += 1) {
      const keypoint = predictions[0].landmarks[j];
      inputs.push(keypoint[0]);
      inputs.push(keypoint[1]);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
  }
  //console.log(results[0].confidence);
  classifyPose();
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  // push();
  // translate(video.width, 0);
  // scale(-1, 1);
  // if (predictions.length > 0) {
  //   let prediction = predictions[0];
  //   //for (let j = 0; j < prediction.landmarks.length; j++) {
  //     let keypoint = prediction.landmarks[8];
  //     noFill();
  //     stroke(0, 0, 0);
  //     circle(keypoint[0], keypoint[1], 40);
  //   //}
  // }
  // pop();

  push();
  translate(video.width + 680, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();

  if (poseLabel == "B") {
    paint();
  } else if (poseLabel == "E") {
    eraser();
  } else if (poseLabel == "C") {
    colorPicker();
  } else {
    circle(0, 0, 0);
  }
}

function colorPicker() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  colorMode(RGB);
  fill(255);
  noStroke();
  rect(130, 440, 380, 30);
  for (let j = 0; j <= 10; j++) {
    for (let i = 0; i <= 360; i++) {
      colorMode(HSB);
      stroke(i, 100, 100);
      point(i + 140, 450 + j);
    }
  }

  colorMode(HSB);
  stroke(0, 0, 100);
  if (predictions.length > 0) {
    let prediction = predictions[0];
    let keypoint = prediction.landmarks[8];

    if (keypoint[0] >= 140 && keypoint[0] <= 140 + 360) {
      myColor = keypoint[0] - 140;
      //console.log(keypoint[0]);
      //console.log(myColor);

      fill(myColor, 100, 100);
      circle(keypoint[0], 455, 20);
    } else if (keypoint[0] < 140) {
      myColor = 360;

      fill(0, 100, 100);
      circle(140, 455, 20);
    } else if (keypoint[0] > 140 + 360) {
      myColor = 360;
      circle(140 + 360, 455, 20);
    }
  }
  pop();
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 1300 && mouseY > 0 && mouseY < 480) {
    saveCanvas();
  }
}

function keyPressed() {
  if (key == " ") {
    background(0, 0, 100);
  }
}

function eraser() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  if (predictions.length > 0) {
    let prediction = predictions[0];
    //for (let j = 0; j < prediction.landmarks.length; j++) {
    let keypoint = prediction.landmarks[8];
    fill(0, 0, 100);
    noStroke();
    circle(keypoint[0], keypoint[1], 35);
  }
}

function paint() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  if (predictions.length > 0) {
    let prediction = predictions[0];
    //for (let j = 0; j < prediction.landmarks.length; j++) {
    let keypoint = prediction.landmarks[8];
    fill(myColor, 100, 100);
    noStroke();
    circle(keypoint[0], keypoint[1], 20);
    //}
  }
  pop();
}
