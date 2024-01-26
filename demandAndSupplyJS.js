var sceneWidth = 500;
var sceneHeight = 500;
var scaleX = 1;
var scaleY = 1;
var firstTime = true;
console.log(firstTime);

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
    stage.width(fitSceneIntoDiv());
    stage.height(fitSceneIntoDiv());
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
  return new Konva.Ellipse({
    x: xPos,
    y: yPos,
    radius: 3,
    id: "coordEllipse",
    visible: false,
    fill: "black",
    listening: true
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
      id: "coordRect" ,
      listening: true
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
    listening: true
  });
}
function showEllipseAndRect(rectID, dotCoordID) {
  console.log(rectID);
  console.log(dotCoordID);
  
  dotCoordID.visible = true;
  rectID.visible = true;


}

function pluggingInCoordIDS() {
  
  var rectArray = stage.find("#coordRect");
  var ellipseArray = stage.find("#coordEllipse");
  
 for (var county = 0; county<= 5; county++){
 var currentRect = rectArray[county];
 var currentEllipse = ellipseArray[county];
 console.log(currentRect);
 console.log(currentEllipse);
 
 
  currentEllipse.on('pointerenter', showEllipseAndRect(currentRect, currentEllipse))


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

var squareWidth = 20;
var xPos = 0;
var yPos = 0;





// no functions below here!!!!!!!!  =^.  ̫.^=  --  >w<




function generatingShapesWhileLoop(){
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

 
generatingShapesWhileLoop();

var testRect = stage.find("#coordRect");

console.log(testRect);

window.addEventListener("resize", checkDivHeightAndWidth);
pluggingInCoordIDS();
