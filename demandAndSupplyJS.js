var sceneWidth = 500;
var sceneHeight = 500;
var scaleX = 1;
var scaleY = 1;
var firstTime = true;
console.log(firstTime);
var squareWidth = 20;

var stage = new Konva.Stage({
  container: "canvasContainer", // id of container <div>
  width: sceneWidth,
  height: sceneHeight,
  id: "konvaStage",
});
var demAndSupLinesLayer = new Konva.Layer();
var backgroundLayer = new Konva.Layer();


function fitSceneIntoDiv() {
  var container = document.getElementById("canvasContainer");
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;

  var changeInScaleX = 500 - (500 - containerWidth);
  var changeInScaleY = 500 - (500 - containerHeight);
  var scale = Math.min(changeInScaleX, changeInScaleY);
  return scale;
}
function checkDivHeightAndWidth() {
  var parentCanvasDiv = document.getElementById("canvasContainer");
  var divWidth = parentCanvasDiv.offsetWidth;
  var divHeight = parentCanvasDiv.offsetHeight;
  if (divWidth <= 500 || divHeight <= 500) {
    
    console.log(stage.width());
    console.log(stage.height());
    var backgroundRectangleCanvas = document.getElementById(
      "canvasContainerBackground" 
    );
    backgroundRectangleCanvas.style.width = stage.width();
    backgroundRectangleCanvas.style.height = stage.height();
  }
}
function generateRectLesson(widthOfText, heightOfText) {
  if (xPos > scene.width / 2()) {
    return new Konva.Rect({
      x: xPos - widthOfText,
      y: yPos,
      fill: "#dae6d8",
      width: widthOfText,
      height: heightOfText,
      stroke: "#cccccc",
      strokeWidth: 0.5,
    });
  }
  return new Konva.Rect({
    x: xPos,
    y: yPos,
    fill: "#dae6d8",
    width: widthOfText,
    height: heightOfText,
    stroke: "#cccccc",
    strokeWidth: 0.5,
  });
}

function generateRect() {
  return new Konva.Rect({
    x: xPos,
    y: yPos,
    fillEnabled: false,
    width: squareWidth,
    height: squareWidth,
    stroke: "#cccccc",
    strokeWidth: 0.5,
    
  });
}

function generatePointsAsCoords() {
  console.log("i think soething is ahppenign")
  return new Konva.Ellipse({
    x: xPos,
    y: yPos,
    radius: 3,
    id: "coordEllipse",
    visible: true,
    fill: "black",
    listening: true,
  });
}

function createRectPointsForCoords() {
  if (xPos > stage.width() / 2) {
    return new Konva.Rect({
      x: xPos - 5,
      y: yPos,
      fill: "#dae6d8",
      width: 5,
      height: 5,
      stroke: "#cccccc",
      strokeWidth: 0.5,
      visible: false,
      id: "coordRect",
      listening: true,
    });
  }
  return new Konva.Rect({
    x: xPos,
    y: yPos,
    fill: "#dae6d8",
    width: 5,
    height: 5,
    stroke: "#cccccc",
    strokeWidth: 0.5,
    visible: false,
    id: "coordRect" + String(xPos) + String(yPos),
    listening: true,
  });
}
function showEllipseAndRect(rectID, dotCoordID) {
  console.log(rectID);
  console.log(dotCoordID);

  dotCoordID.visible(true);
  rectID.visible(true);
}





function pluggingInCoordIDS() {
  var rectArray = stage.find("#coordRect");
  var ellipseArray = stage.find("#coordEllipse");

  for (var county = 0; county <= Math.min(rectArray.length, ellipseArray.length); county++) {
    var currentRect = rectArray[county];
    var currentEllipse = ellipseArray[county];
    console.log(currentRect);
    console.log(currentEllipse);

    currentEllipse.on("pointerenter", function () {
      showEllipseAndRect(currentRect, currentEllipse);
    });
  }
}

var supLine = new Konva.Line({
  points: [0, 0, stage.width(), stage.height()],
  stroke: "black",
  strokeWidth: 5,
  listening: true,
});
var demLine = new Konva.Line({
  points: [0, stage.height(), stage.width(), 0],
  stroke: "black",
  strokeWidth: 5,
  listening: true,
});

var equilibrium = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 10,
  fill: "black",
});
demAndSupLinesLayer.add(equilibrium);
demAndSupLinesLayer.add(supLine);
demAndSupLinesLayer.add(demLine);
backgroundLayer.add(generateRect());
stage.add(backgroundLayer);
stage.add(demAndSupLinesLayer);
console.log("hii");


var xPos = 0;
var yPos = 0;
function generatingShapesWhileLoop() {
  xPos = 0;
  yPos = 0;
  while (yPos <= stage.height() - squareWidth) {
    xPos = 0;
    while (xPos <= stage.width() - squareWidth) {
      backgroundLayer.add(generateRect());
      backgroundLayer.add(generatePointsAsCoords());

      xPos = xPos + squareWidth;
      //console.log('printed points at' + xPos + ',' + yPos);
    }
    yPos = yPos + squareWidth;
  }
  stage.add(backgroundLayer);
  xPos = 0;

  while (yPos <= stage.height()) {
    xPos = 0;
    while (xPos <= stage.width()) {
      backgroundLayer.add(generatePointsAsCoords());
      backgroundLayer.add(createRectPointsForCoords());
      //console.log('printed points at' + xPos + ',' + yPos);

      xPos = xPos + squareWidth;
    }
    yPos = yPos + squareWidth;
  }
  xPos = stage.width();
  yPos = 0;
  console.log(stage.height());
  while (yPos <= stage.height()) {
    backgroundLayer.add(generatePointsAsCoords());

    backgroundLayer.add(createRectPointsForCoords());
    //console.log('printed points at' + xPos + ',' + yPos);
    yPos = yPos + squareWidth;
  }
  stage.add(backgroundLayer);
}

// no functions below here!!!!!!!!  =^.  ̫.^=  --  >w<



///interactive lines !!!!!!!!!!!!!!!

var rightSupLinePoint = supLine.points()[3]
var rightDemLinePoint = demLine.points()[3];
var leftDemLinePoint = demLine.points()[1];
var leftSupLinePoint = supLine.points()[1];
var lastDraggedLeftSupPoint;
var lastDraggedLeftDemPoint;
var lastDraggedRightSupPoint;
var lastDraggedRightDemPoint;


var originalXSupLeft = supLine.points()[0];
var originalXSupRight = supLine.points()[2];
var originalXDemLeft = demLine.points()[0];
var originalXDemRight = demLine.points()[2];



  console.log(leftSupLinePoint+ "is y (left anchor on supline) and x is" + supLine.points()[0]);
const supLineAnchorLeft = new Konva.Circle({
  x:supLine.points()[0],
  y: leftSupLinePoint,
  radius: 50,
  //fill: 'blue',
  draggable: true
})

demAndSupLinesLayer.add(supLineAnchorLeft);

const supLineAnchorRight = new Konva.Circle({
  x: supLine.points()[2],
  y: rightSupLinePoint,
  radius: 50,
  fill: 'blue',
  draggable: true
})
demAndSupLinesLayer.add(supLineAnchorRight);
console.log(rightSupLinePoint+ "is y (right anchor on supline) and x is" + supLine.points()[2]);
//demand line

const demLineAnchorLeft = new Konva.Circle({
  x:demLine.points()[0],
  y: leftDemLinePoint,
  radius: 50,
  //fill: 'red',
  draggable: true
})

demAndSupLinesLayer.add(demLineAnchorLeft);

const demLineAnchorRight = new Konva.Circle({
  x: demLine.points()[2],
  y: rightDemLinePoint,
  radius: 50,
  //fill: 'red',
  draggable: true
})
demAndSupLinesLayer.add(demLineAnchorRight);



function moveOnX(line,dotName1,dotName2){
  
}


var isSupLine;
<<<<<<< HEAD
<<<<<<< HEAD
function moveBothLines(line, dotName1, dotName2, dotDragged){
  //console.log(dotName1.getRelativePointerPosition().x);
=======
function moveBothLines(line, dotName1, dotName2){
  console.log(dotName1.getRelativePointerPosition().x);
>>>>>>> parent of ebbb415 (equilibrium moves!!)
=======
function moveBothLines(line, dotName1, dotName2){
  console.log(dotName1.getRelativePointerPosition().x);
>>>>>>> parent of ebbb415 (equilibrium moves!!)
  if ((dotName1.getRelativePointerPosition().x == null) || (dotName1.getRelativePointerPosition().y == null)){
    return;
   }
   if (line === supLine){
    var leftLinePoint = leftSupLinePoint;
    var rightLinePoint = rightSupLinePoint;
    var originalXpointLeft = originalXSupLeft;
    var originalXpointRight = originalXSupRight;
    isSupLine = true;
   } else if (line === demLine){
    var leftLinePoint = leftDemLinePoint;
    var rightLinePoint = rightDemLinePoint;
    var originalXpointLeft = originalXDemLeft;
    var originalXpointRight = originalXDemRight;
   }
 var mousePos1 = dotName1.getRelativePointerPosition().x;
 var mousePos2 = dotName2.getRelativePointerPosition().x;
 var mouseXrelPoint1 = originalXpointLeft - mousePos1;
 var mouseXrelPoint2 = originalXpointRight - mousePos2;
<<<<<<< HEAD
<<<<<<< HEAD
 var YmousePos1 = dotName1.getRelativePointerPosition().x;
 var YmousePos2 = dotName2.getRelativePointerPosition().x;
 var mouseYrelPoint1 = leftLinePoint - YmousePos1;
 var mouseYrelPoint2 = rightLinePoint - YmousePos2;
 //console.log(mouseXrelPoint2);
 //console.log(mouseXrelPoint1);
=======
 console.log(mouseXrelPoint2);
 console.log(mouseXrelPoint1);
>>>>>>> parent of ebbb415 (equilibrium moves!!)
=======
 console.log(mouseXrelPoint2);
 console.log(mouseXrelPoint1);
>>>>>>> parent of ebbb415 (equilibrium moves!!)
 

if (supLine) {
    //lastDraggedLeftSupPoint = lastLeftDraggedPoint;
    //lastDraggedRightSupPoint = lastRightDraggedPoint;
    lastLeftYDraggedPoint = lastDraggedYLeftSupPoint;
    lastRightYDraggedPoint = lastDraggedYRightSupPoint;
  } else {
    lastLeftYDraggedPoint = lastDraggedYLeftDemPoint;
    lastRightYDraggedPoint = lastDraggedYRightDemPoint;
  }



<<<<<<< HEAD

if (dotDragged == "right") {
  
if (line.points[2] > stage.width()){
  if ((Math.abs(mouseYrelPoint1%squareWidth) <1)|| ((Math.abs(mouseYrelPoint2%squareWidth)) <1)){
    line.points[3] = dotName2.y();
    line.points[2] = stage.width();
    var difference = Math.abs(dotName2.x() - (stage.width()+stage.width/50));
  dotName2.radius() = dotName2.radius() + difference;
  }

} 
if ((Math.abs(mouseXrelPoint1%squareWidth) <1)|| ((Math.abs(mouseXrelPoint2%squareWidth)) <1)){
 

=======
 if ((Math.abs(mouseXrelPoint1%squareWidth) <1)|| ((Math.abs(mouseXrelPoint2%squareWidth)) <1)){
  console.log("far enough");
 dotName1.y(leftLinePoint);
 dotName2.y(rightLinePoint);
<<<<<<< HEAD
>>>>>>> parent of ebbb415 (equilibrium moves!!)
=======
>>>>>>> parent of ebbb415 (equilibrium moves!!)
 const points = [
  dotName1.x(),
  leftLinePoint,
  dotName2.x(),
  rightLinePoint,
 ]
line.points(points);
if (isSupLine){
  originalXSupLeft = line.points()[0];
  originalXSupRight = line.points()[2];
  var maxLeftX = 0;
} else {
  originalXDemLeft = line.points()[0];
  originalXDemRight = line.points()[2];
  var maxLeftX = stage.width();
}
demAndSupLinesLayer.batchDraw();

 } else {
  
  if (isSupLine == true){
    dotName1.y(leftLinePoint);
    dotName2.y(rightLinePoint);
    const points = {
      originalXSupLeft,
      leftLinePoint,
      originalXSupRight,
      rightLinePoint,
    }
    //line.points(points);
  } else {
    dotName1.y(leftLinePoint);
    dotName2.y(rightLinePoint);
    const points = {
      originalXDemLeft,
      leftLinePoint,
      originalXDemRight,
    }
    //line.points(points);
  }
  
 }
 
 }
 
}



 
function resetAnchor(anchor1, anchor2, line){
  anchor1.x(line.points()[0]);
  anchor2.x(line.points()[2]);
  anchor1.y(line.points()[1]);
  anchor2.y(line.points()[3]);
  console.log(anchor1.x());
  console.log(anchor2.x());
  //if (anchor2.x() > 500){
    //anchor2.x(500);
  //}
  /*
  if (line === supLine){
  if(!(anchor1.x() =<0())){
    anchor1.x(0);
  }
  if(!(anchor2.x() <stage.width())){
    anchor2.x(stage.width);
  }
}
*/
}
stage.add(demAndSupLinesLayer);
stage.draw();
//demLineFunction

demLineAnchorLeft.on('dragmove', function () {
<<<<<<< HEAD
<<<<<<< HEAD
  moveBothLines(demLine, demLineAnchorLeft, demLineAnchorRight, "left");
  remapEquilibrium();
});

demLineAnchorRight.on('dragmove', function () {
  moveBothLines(demLine, demLineAnchorLeft, demLineAnchorRight, "right");
  remapEquilibrium();
});

supLineAnchorLeft.on('dragmove', function () {
  moveBothLines(supLine, supLineAnchorLeft, supLineAnchorRight, "left");
  remapEquilibrium();
});

supLineAnchorRight.on('dragmove', function () {
  moveBothLines(supLine, supLineAnchorLeft, supLineAnchorRight, "right");
  remapEquilibrium();
=======
  moveBothLines(demLine, demLineAnchorLeft, demLineAnchorRight);
});

demLineAnchorRight.on('dragmove', function () {
  moveBothLines(demLine, demLineAnchorLeft, demLineAnchorRight);
});

supLineAnchorLeft.on('dragmove', function () {
  moveBothLines(supLine, supLineAnchorLeft, supLineAnchorRight);
});

supLineAnchorRight.on('dragmove', function () {
  moveBothLines(supLine, supLineAnchorLeft, supLineAnchorRight);
>>>>>>> parent of ebbb415 (equilibrium moves!!)
=======
  moveBothLines(demLine, demLineAnchorLeft, demLineAnchorRight);
});

demLineAnchorRight.on('dragmove', function () {
  moveBothLines(demLine, demLineAnchorLeft, demLineAnchorRight);
});

supLineAnchorLeft.on('dragmove', function () {
  moveBothLines(supLine, supLineAnchorLeft, supLineAnchorRight);
});

supLineAnchorRight.on('dragmove', function () {
  moveBothLines(supLine, supLineAnchorLeft, supLineAnchorRight);
>>>>>>> parent of ebbb415 (equilibrium moves!!)
});

demLineAnchorLeft.on('dragend', function () {
  resetAnchor(demLineAnchorLeft, demLineAnchorRight, demLine);
});
demLineAnchorRight.on('dragend', function () {
  resetAnchor(demLineAnchorLeft, demLineAnchorRight, demLine);
});

supLineAnchorLeft.on('dragend', function () {
  resetAnchor(supLineAnchorLeft, supLineAnchorRight, supLine);
});

supLineAnchorRight.on('dragend', function () {
  resetAnchor(supLineAnchorLeft, supLineAnchorRight, supLine);
});


<<<<<<< HEAD
<<<<<<< HEAD
//find slope and equations relevant
function findPoints(line, secondLine){
  var x11 = line.points()[0];
  var y11 = line.points()[1];
  var x12 = line.points()[2];
  var y12 = line.points()[3];
  var sl1 = (y12 -y11)/(x12-x11);
  var x21 = secondLine.points()[0];
  var y21 = secondLine.points()[1];
  var x22 = secondLine.points()[2];
  var y22 = secondLine.points()[3];
  var sl2 = (y22 - y21)/(x22 - x21);
  var line1Yint = y11 - sl1*x11;
  var line2Yint = y21 - sl2*x21;
  if (sl1 == sl2){
    var sharedXcoord = ((x11-x12)/2);
    var sharedYcoord = ((y11 - y12)/2);
    //console.log("equilibrium x:" +sharedXcoord + ",y:" + sharedYcoord);
    return[sharedXcoord,sharedYcoord,sl1,sl2];
  } else {
  var sharedXcoord = ((line1Yint - line2Yint)/(sl2-sl1));
  var sharedYcoord =sl1*sharedXcoord + line1Yint;
  //console.log("equilibrium x:" +sharedXcoord + ",y:" + sharedYcoord);
  return[sharedXcoord,sharedYcoord,sl1,sl2];
  }
}
=======
>>>>>>> parent of ebbb415 (equilibrium moves!!)


=======


>>>>>>> parent of ebbb415 (equilibrium moves!!)











generatingShapesWhileLoop();



window.addEventListener("resize", checkDivHeightAndWidth);
//pluggingInCoordIDS();
backgroundLayer.draw();
