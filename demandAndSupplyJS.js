var sceneWidth = 500;
var sceneHeight = 500;
var scaleX = 1;
var scaleY = 1;
var firstTime = true;
console.log(firstTime);
var squareWidth = 25;
var taxShown = false;
var unitTax = 100;
var firstTaxInput = true;
var invisLine;

//tax empty vars

var puEquilbrium;
var supLineUnitTax;
var newPuEq;
var taxRevenue;
var dwl;
var taxLabel;
var dwlLabel;



var stage = new Konva.Stage({
  container: "canvasContainer", // id of container <div>
  width: sceneWidth,
  height: sceneHeight,
  id: "konvaStage", 
});
var supLine = new Konva.Line({
  points: [0, 0, stage.width(), stage.height()],
  stroke: "black",
  strokeWidth: 2,
  listening: true,
});
var demLine = new Konva.Line({
  points: [0, stage.height(), stage.width(), 0],
  stroke: "black",
  strokeWidth: 2,
  listening: true,
});
var frontLayer = new Konva.Layer();
stage.add(frontLayer);
var demAndSupLinesLayer = new Konva.Layer();
var backgroundLayer = new Konva.Layer();
var taxLayer = new Konva.Layer();
var equilibrium = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 10,
  fill: "#ABFF4F"
  
});
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
  console.log("equilibrium x:" +sharedXcoord + ",y:" + sharedYcoord);
  return[sharedXcoord,sharedYcoord,sl1,sl2, line1Yint, line2Yint];
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

  var prodSurplus = new Konva.Line({
    points: [0, stage.width(), equilibrium.x(), equilibrium.y(), 0, equilibrium.y(), demLine.points()[0], demLine.points()[1]],
    fill: 'red',
    opacity: 0.5,
    closed: true,
  });



var consSurplus = new Konva.Line({
  points: [0, 0, equilibrium.x(), equilibrium.y(), 0, equilibrium.y()],
  fill: 'blue',
  opacity:0.5,
  closed: true,
});
taxLayer.add(consSurplus);

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



var originalXSupLeft = supLine.points()[0];
var originalXDemLeft = demLine.points()[0];
var originalXDemRight = demLine.points()[2];
var originalXSupRight = supLine.points()[2];



  console.log(leftSupLinePoint+ "is y (left anchor on supline) and x is" + supLine.points()[0]);
const supLineAnchorLeft = new Konva.Circle({
  x:supLine.points()[0],
  y: leftSupLinePoint,
  radius: 50,
  
  stroke: 'black',
  strokeWidth: 0.5,
  draggable: true
})

demAndSupLinesLayer.add(supLineAnchorLeft);

const supLineAnchorRight = new Konva.Circle({
  x: supLine.points()[2],
  y: rightSupLinePoint,
  radius: 50,
  
  stroke: 'black',
  strokeWidth: 0.5,
  draggable: true
})
demAndSupLinesLayer.add(supLineAnchorRight);
console.log(rightSupLinePoint+ "is y (right anchor on supline) and x is" + supLine.points()[2]);
//demand line

const demLineAnchorLeft = new Konva.Circle({
  x:demLine.points()[0],
  y: leftDemLinePoint,
  radius: 50,
  
  stroke: 'black',
  strokeWidth: 0.5,
  draggable: true
})

demAndSupLinesLayer.add(demLineAnchorLeft);

const demLineAnchorRight = new Konva.Circle({
  x: demLine.points()[2],
  y: rightDemLinePoint,
  radius: 50,
  
  stroke: 'black',
  strokeWidth: 0.5,
  draggable: true
})
demAndSupLinesLayer.add(demLineAnchorRight);

var isSupLine;

function moveBothLines(line, dotName1, dotName2){

  if ((dotName1.getRelativePointerPosition().x == null) || (dotName1.getRelativePointerPosition().y == null)){
    stage.setPointersPositions({x: stage.width()/2, y: stage.height()/2});
   }
   //assigning variables and such :3
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
 var mouseYrelPoint1 = dotName1.getRelativePointerPosition().y;
 var mouseYrelPoint2 = dotName2.getRelativePointerPosition().y;
 var generalMousePositionY = stage.getRelativePointerPosition().y;
 var generalMousePositionX = stage.getRelativePointerPosition().x;
 var mouseXrelPoint1 = originalXpointLeft - mousePos1;
 var mouseXrelPoint2 = originalXpointRight - mousePos2;
 //console.log(mouseXrelPoint2);
 //console.log(mouseXrelPoint1);
 


//new segment: checking if circles are on mousex/mousey etc (decided to use mouse placement as a gauge for where the circle goes higkey)
if ((generalMousePositionX > squareWidth*1.5) || (generalMousePositionX > stage.width() - squareWidth*1.5)){
//MOUSE X CHECKING!! IVER GERE!! 
 if ((Math.abs(mouseXrelPoint1%squareWidth) <1)|| ((Math.abs(mouseXrelPoint2%squareWidth)) <1)){
  console.log("far enough");
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
//RESETTING Y IF X ISN"T TRUE!! DOESNT HAVE TO DO WITH CHANGING Y COORDS LOOL
 } else {
  
  if (isSupLine){
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
       originalXDemRight, //why are there only three variables here
    }
    //line.points(points);
  }
  
 }
 //yaxis movement over here acktually 
 } else {
  if (line === supLine){
    var leftLinePoint = leftSupLinePoint;
    var rightLinePoint = rightSupLinePoint;
    var originalYpointLeft = originalXSupLeft;
    var originalYpointRight = originalXSupRight;
    isSupLine = true;
   } else if (line === demLine){
    var leftLinePoint = leftDemLinePoint;
    var rightLinePoint = rightDemLinePoint;
    var originalYpointLeft = originalXDemLeft;
    var originalYpointRight = originalXDemRight;
   }
 var mousePos1Y = dotName1.getRelativePointerPosition().y;
 var mousePos2Y = dotName2.getRelativePointerPosition().y;
 var mouseYrelPoint1 = originalYpointLeft - mousePos1Y;
 var mouseYrelPoint2 = originalYpointRight - mousePos2Y;
  if ((Math.abs(mouseYrelPoint1%squareWidth) <1)|| ((Math.abs(mouseYrelPoint2%squareWidth)) <1)){
  //y axis movement - should be the same as x? maybe hioefully im so sleepy highkey
  //far enough here
  const points = [
    dotName1.x(),
    dotName1.y(),
    dotName2.x(),
    dotName2.y(),
  ]

  line.points(points);
}

}
  updateProdSurplus();
  //remapEquilibrium();
  if (taxShown){
    updateEverythingWPU();
    console.log(demLine.points());
  }

}
 

var csuLabel = new Konva.Text({
  x: 0,
  y: consSurplus.points()[7],
  text: 'consumer surplus',
  fill: 'white',
  fontSize: 20,
  opacity: 0,
  });
  
  
  taxLayer.add(csuLabel);

  var psuLabel = new Konva.Text({
    x: 0,
    y: prodSurplus.points()[3],
    text: 'producer surplus',
    fill: 'white',
    fontSize: 20,
    opacity: 0,
    });


    taxLayer.add(psuLabel);
  
// tax section //


taxLayer.batchDraw();

function updateSupUnitTax(){
  demLine.stroke('gray');
  console.log("unitTax" + unitTax);
  supLineUnitTax.points([demLine.points()[0], demLine.points()[1] - unitTax, demLine.points()[2], demLine.points()[3] - unitTax]);
  taxLayer.batchDraw();
  console.log("tax run")
  supLineUnitTax.opacity(1);
  if (demLine.points()[0] > 1) {
  
    var newX = (demLine.points()[0] - unitTax);

    supLineUnitTax.points()[0] = newX;
    supLineUnitTax.points()[1] = stage.height();
  }


}





function movePuEquilibrium(){
  var x = findPoints(supLineUnitTax, supLine)[0];
  var y = findPoints(supLineUnitTax, supLine)[1];
  
  puEquilbrium.x(x);
  puEquilbrium.y(y);
  taxLayer.batchDraw();
  equilibrium.fill('gray');
  console.log("pu moving");
}

 
function resetAnchor(anchor1, anchor2, line){
  anchor1.x(line.points()[0]);
  anchor2.x(line.points()[2]);
  anchor1.y(line.points()[1]);
  anchor2.y(line.points()[3]);
  

}
stage.add(demAndSupLinesLayer);
stage.draw();

function findYofNewEq(){
  var puX = puEquilbrium.x();
  var puY = puEquilbrium.y();
 invisLine = new Konva.Line({
points: [puX, puY-10, puX, stage.height()],
opacity: 0,
stroke: 'black',
stroke: 2,
});
taxLayer.add(invisLine);
taxLayer.batchDraw();

var slopeNewTax = findPoints(supLineUnitTax, invisLine)[2];
var yIntercept = demLine.points()[1] - (slopeNewTax * demLine.points()[0]);
var y = (slopeNewTax*puX + yIntercept);
var x = puX;
console.log(puX);
console.log(x + y);
return [x,y];
}


taxLayer.batchDraw();

function updateNewPuEq(){
  newPuEq.x(findYofNewEq()[0]);
  newPuEq.y(findYofNewEq()[1]);
  newPuEq.opacity(1);
  //console.log("update ran, " + newPuEq.x() + newPuEq.y());
}





taxLayer.batchDraw();

function updateEverythingWPU(){
//update sup tax line
updateSupUnitTax();



// tax revenue
var taxRevPoints = [0, puEquilbrium.y(), puEquilbrium.x(), puEquilbrium.y(), newPuEq.x(), newPuEq.y(), 0, newPuEq.y()]
taxRevenue.points(taxRevPoints);

// cons surplus
consSurplus.points()[4] = puEquilbrium.x();
consSurplus.points()[5] = puEquilbrium.y();
consSurplus.points()[7] = puEquilbrium.y();

// prod surplus
prodSurplus.points()[4] = newPuEq.x();
prodSurplus.points()[5] = newPuEq.y();
prodSurplus.points()[3] = newPuEq.y();
// deadweight loss
var dwlPoints = [puEquilbrium.x(), puEquilbrium.y(), equilibrium.x(), equilibrium.y(), newPuEq.x(), newPuEq.y()];
console.log("dwl points" + dwlPoints);
dwl.opacity(0.5);
dwl.points(dwlPoints);

//labels
taxLabel.opacity(1);
taxLabel.y((taxRevenue.points()[1] + taxRevenue.points()[3])/2);


csuLabel.opacity(1);
csuLabel.y((consSurplus.points()[7] - csuLabel.fontSize()));

psuLabel.opacity(1);
psuLabel.y(prodSurplus.points()[3]);

dwlLabel.opacity(1);
dwlLabel.x(dwl.points()[4]);
dwlLabel.y((dwl.points()[1] + dwl.points()[3])/2);


updateNewPuEq();

movePuEquilibrium();


}
//demLineFunction

demLineAnchorLeft.on('dragmove', function () {
  moveBothLines(demLine, demLineAnchorLeft, demLineAnchorRight);
  remapEquilibrium();
  putInMRS();
  updateProdSurplus();
  
  


});

demLineAnchorRight.on('dragmove', function () {
  moveBothLines(demLine, demLineAnchorLeft, demLineAnchorRight);
  remapEquilibrium();
  putInMRS();
  updateProdSurplus();
  
  
});

supLineAnchorLeft.on('dragmove', function () {
  moveBothLines(supLine, supLineAnchorLeft, supLineAnchorRight);
  remapEquilibrium();
  putInMRS();
  updateProdSurplus();
  
 
});

supLineAnchorRight.on('dragmove', function () {
  moveBothLines(supLine, supLineAnchorLeft, supLineAnchorRight);
  remapEquilibrium();
  putInMRS();
  updateProdSurplus();
  
});

demLineAnchorLeft.on('dragend', function () {
  resetAnchor(demLineAnchorLeft, demLineAnchorRight, demLine);
  //remapEquilibrium();
  putInMRS();
  updateProdSurplus();
  
  
});

demLineAnchorRight.on('dragend', function () {
  resetAnchor(demLineAnchorLeft, demLineAnchorRight, demLine);
  //remapEquilibrium();
  putInMRS();
  updateProdSurplus();
  
});

supLineAnchorLeft.on('dragend', function () {
  resetAnchor(supLineAnchorLeft, supLineAnchorRight, supLine);
  //remapEquilibrium();
  putInMRS();
  
});

supLineAnchorRight.on('dragend', function () {
  resetAnchor(supLineAnchorLeft, supLineAnchorRight, supLine);
  //remapEquilibrium();
  putInMRS();
  
});

  var cds = new Konva.Text({
    x: 0,
    y: 0,
    text: "",
    fontSize: 15,
    fontFamily: 'Arial',
    fill: 'black',
    shadowColor: 'white',
    shadowBlur: 5,
    shadowOpacity: 1,
    opacity:0,
  });
  frontLayer.add(cds);

function delayedShow(){
  var pointerPos = stage.getPointerPosition();
  
  if (!(pointerPos == undefined)) {
    cds.opacity(1);
    var x = pointerPos.x;
    var y = pointerPos.y;
    cds.text((Math.round(x)) + "," + (Math.round(500 - y)));
    console.log(x);
    if (x > stage.width()/2){
      x = x - 20;
    } else {
      x = x + 20;
    }

    if (pointerPos.y > stage.height()/2) {
      y = y - 20;
    } else {
      y = y + 20;
    }
      cds.x(x);
      cds.y(y);
      
      console.log(pointerPos);
      frontLayer.batchDraw();
    
    console.log("mouse over ran");
    cds.moveToTop();
}
}

stage.on("mousedown", function () {
  
      delayedShow();

});

stage.on("mouseup", function () {
cds.opacity(0);
});




demLineAnchorLeft.on('mouseenter', function(){
  document.body.style.cursor = 'pointer';
})
demLineAnchorRight.on('mouseenter', function(){
  document.body.style.cursor = 'pointer';
})
supLineAnchorLeft.on('mouseenter', function(){
  document.body.style.cursor = 'pointer';
})
supLineAnchorRight.on('mouseenter', function(){
  document.body.style.cursor = 'pointer';
})


demLineAnchorLeft.on('mouseout', function(){
  document.body.style.cursor = 'default';
})
demLineAnchorRight.on('mouseout', function(){
  document.body.style.cursor = 'default';
})
supLineAnchorLeft.on('mouseout', function(){
  document.body.style.cursor = 'default';
})
supLineAnchorRight.on('mouseout', function(){
  document.body.style.cursor = 'default';
})

function updateProdSurplus(){

var newNewPoints = [0, stage.height(), 0, equilibrium.y(), equilibrium.x(), equilibrium.y(), demLine.points()[0], demLine.points()[1]];

  prodSurplus.points(newNewPoints);
  
  console.log("updated prodSurplus");
  
  taxLayer.batchDraw();
  var points = [0, 0, supLine.points()[0], supLine.points()[1], equilibrium.x(), equilibrium.y(), 0, equilibrium.y()];
  consSurplus.points(points);
  if (taxShown){
    consSurplus.points()[4] = puEquilbrium.x();
    consSurplus.points()[5] = puEquilbrium.y();
    consSurplus.points()[7] = puEquilbrium.y();
    ///
    prodSurplus.points()[3] = newPuEq.y();
    prodSurplus.points()[4] = newPuEq.x();
    prodSurplus.points()[5] = newPuEq.y();

  }
  taxLayer.batchDraw();




}



 


//find slope and equations relevant







function moveDownLines(line){
  if (line === "supLine"){
    supLine.points[0] = supLine.points[0] - squareWidth;
    supLine.points[2] = supLine.points[2] - squareWidth;
  } else {
    demLine.points[0] = demLine.points[0] - squareWidth;
    demLine.points[2] = demLine.points[0] - squareWidth;
  }
  console.log('movedown')
  }


function putInMRS(){
var mrsOfDem = document.getElementById("mrsOfDem");
var mrsOfSup = document.getElementById("mrsOfSup");
// Extracting the coordinates of the points
var x1 = supLine.points()[0];
var y1 = supLine.points()[1];
var x2 = supLine.points()[2];
var y2 = supLine.points()[3];

// Calculate the change in quantity demanded
var deltaQ = y2 - y1;
var q1 = (y1 + y2) / 2; // Using the average of the initial and final quantity demanded

// Calculate the percentage change in quantity demanded
var percentChangeQ = (deltaQ / q1) * 100;

// Calculate the change in price
var deltaP = x2 - x1;
var p1 = (x1 + x2) / 2; // Using the average of the initial and final price

// Calculate the percentage change in price
var percentChangeP = (deltaP / p1) * 100;

// Calculate the price elasticity of demand
var demandElasticity = percentChangeQ / percentChangeP;

// Determine the type of elasticity
var measureElasticityDem;
if (demandElasticity > 1){
   measureElasticityDem = "inelastic";
   console.log("elastic");
} else if (demandElasticity < 1){
   measureElasticityDem = "elastic";
   console.log("inelastic");
} else {
   measureElasticityDem = "unit elastic";
   console.log("unit elastic");
}

console.log("Price Elasticity of Demand: ", demandElasticity);

mrsOfDem.textContent = "demand is: " + measureElasticityDem;;


//elasticity of supply

x1 = demLine.points()[0];
y1 = demLine.points()[1];
x2 = demLine.points()[2];
y2 = demLine.points()[3];

// Calculate the change in quantity demanded
 deltaQ = y2 - y1;
 q1 = (y1 + y2) / 2; // Using the average of the initial and final quantity demanded

// Calculate the percentage change in quantity demanded
 percentChangeQ = (deltaQ / q1) * 100;

// Calculate the change in price
 deltaP = x2 - x1;
p1 = (x1 + x2) / 2; // Using the average of the initial and final price

// Calculate the percentage change in price
percentChangeP = (deltaP / p1) * 100;
var supplyElasticity = (percentChangeQ / percentChangeP)*-1;
console.log(supplyElasticity);
var measureElasticitySup;
if (supplyElasticity > 1){
   measureElasticitySup = "inelastic";
   console.log("elastic");
} else if (supplyElasticity < 1){
   measureElasticitySup = "elastic";
   console.log("inelastic");
} else {
   measureElasticitySup = "unit elastic";
   console.log("unit elastic");
}


mrsOfSup.textContent = "supply is " + measureElasticitySup;
}


function remapEquilibrium(){
  var newX = findPoints(supLine, demLine)[0];
  var newY = findPoints(supLine, demLine)[1];
  //console.log("equilibrium x:" +newX + ",y:" + newY);
  equilibrium.x(newX);
  equilibrium.y(newY);
  equilibrium.moveToTop();
  updateProdSurplus();
  

}
var coords = new Konva.Text({
  x: 0,
  y: 0,
  text: '',
  fontSize: 30,
  fontFamily: 'Calibri',
  fill: 'green',
  isVisible: false,
});

var coordsBox = new Konva.Rect({
  x: 0,
  y: 0,
  width: (coords.width() + 5),
  height: (coords.height() + 5),
  isVisible: false,
})


function createNumbsForXAxis(xPos){
  console.log(xPos);
  console.log(xPos.toString());
  return new Konva.Text({ 
    x: xPos,
    y: stage.height()-10,
    text: xPos.toString(),
    fontSize: 10,
    fontFamily: 'Arial',
    fill: 'black',
  });

}

function createNumbsForYAxis(yPos){
  return new Konva.Text({
    x: 0,
  y:yPos,
  text: (500-yPos).toString(),
  fontSize: 10,
  fontFamily: 'Arial',
  fill: 'black'

  })
}

for (var i = 0; i <= stage.width(); i = i + squareWidth){

  backgroundLayer.add(createNumbsForXAxis(i));
  backgroundLayer.draw();
}
for (var i = 0; i<= stage.height(); i = i + squareWidth){
backgroundLayer.add(createNumbsForYAxis(i));
backgroundLayer.draw();

}





function resetLines (){
  supLine.points([0, 0, stage.width(), stage.height()]);
  demLine.points([0, stage.height(), stage.width(), 0]);
  remapEquilibrium();
  demAndSupLinesLayer.batchDraw();
  resetAnchor(supLineAnchorLeft, supLineAnchorRight, supLine);
  resetAnchor(demLineAnchorLeft, demLineAnchorRight, demLine);

  putInMRS();
  moveBothLines(supLine, supLineAnchorLeft, supLineAnchorRight);
  moveBothLines(demLine, demLineAnchorLeft, demLineAnchorRight);
  console.log("lines reset")
}

function showStuff(){
xPos = stage.getRelativePointerPosition().x;
yPos = stage.getRelativePointerPosition().y;
//positioning the box .w. >3<
if (xPos > (stage.width()/2)){
coordsBox.x(xPos - 5);
if (yPos > (stage.height()/2)){
coordsBox.y(yPos)
} else {
  coordsBox.y(yPos - 5);
}
} else {
  coordsBox.x(xPos);
  if (yPos > (stage.height()/2)){
    coordsBox.y(yPos);
    } else {
      coordsBox.y(yPos - 5);
    }
}

}





document.getElementById("resetLines").addEventListener("click", resetLines);




generatingShapesWhileLoop();

var testRect = stage.find("#coordRect");

console.log(testRect);

window.addEventListener("resize", checkDivHeightAndWidth);
//pluggingInCoordIDS();
backgroundLayer.draw();
equilibrium.draw();

putInMRS();
// store the position of two lines in cookies

//set the text of meow meow normally


consSurplus.on('mouseover', function () {
  catSpeak('consSurplus');
});
prodSurplus.on('mouseover', function () {
  catSpeak('prodSurplus');
});
equilibrium.on('mouseover', function () {
  catSpeak('equilibrium');
});
supLine.on('mouseover', function () {
  catSpeak('supLine');
});
demLine.on('mouseover', function () {
  catSpeak('demLine');
});









consSurplus.on('mouseout', function () {
  resetCatSpeak();
});
prodSurplus.on('mouseout', function () {
  resetCatSpeak();
});
equilibrium.on('mouseout', function () {
  resetCatSpeak();
});
supLine.on('mouseout', function () {
  resetCatSpeak();
});
demLine.on('mouseout', function () {
  resetCatSpeak();
});



function catSpeak(area){
  console.log("cat speaking");
  
if (area === 'consSurplus'){
  document.getElementById("chatText").textContent = "this is consumer surplus. the distance between the demand line and the equilibrium, the market price, represents how much the consumer is underpaying for the product in proportion to the happiness they recieve from it.";
} else if (area === 'prodSurplus'){
  document.getElementById("chatText").textContent = "this is producer surplus. the distance between the supply line and the equilibrium, the market price, represents how much net profit the producer is making."
} else if (area === 'equilibrium'){
  document.getElementById("chatText").textContent = "this is the market equilibrium. it is the point where the quantity demanded and quantity supplied are equal. this is the market price that all perfectly competitive markets regress to.";
} else if (area === 'supLine'){
  document.getElementById("chatText").textContent = "this is the supply line. it represents the quantity of a good (y) that producers are willing to produce at a given price (x). the slope of the line represents the price elasticity of supply which measures how sensitive the relationship between price and product produced is.";
} else if (area === 'demLine'){
  document.getElementById("chatText").textContent = "this is the demand line. it represents the quantity of a good (y) that consumers are willing to buy at a given price (x). the slope of the line represents the price elasticity of demand, which measures how sensitive the relationship between price and quantity demanded is.";
} else if (area === 'taxRevenue'){
document.getElementById("chatText").textContent = "this is the tax revenue. it represents the areas where consumer or producer satisfaction has been taken away by the government in the form of taxes. coordinates where consumers or producers formerly recieved consumer surplus or producer surplus are now just the same as the equilbrium 1 for 1 trade";
} else if (area === 'dwl'){
  document.getElementById("chatText").textContent = 'this is the area where consumers and producers who once recieved surplus are more worse off than the government is better off. in a sense, more value is lost than gained by tax, which is why this area is labeled deadweight loss.';
} else if (area === 'supUnitTax'){
  document.getElementById("chatText").textContent = "this is the supply line after the tax has been implemented. unit taxes (a set price on each quantity of product sold) are usually passed on to the consumer in the form of higher prices, as the cost of tax is tacked onto production costs.";
} else {

}

document.getElementById("catModel").src = "assets/dinklyCatShrugging.gltf";

}
function resetCatSpeak(){
  console.log("cat stopped speaking");
  document.getElementById("chatText").textContent = "meow meow meow";
  document.getElementById("catModel").src = "assets/dinklyCat.gltf";
}

function submitClicked(){
  if (document.getElementById("taxInput").value == ""){
    console.log("submitClicked run")
    return;
  } else {
    unitTax = document.getElementById("taxInput").value;
    console.log(unitTax);
    taxShown = true;
    
  
  }
}

document.getElementById("taxSubmit").addEventListener("click", whenTaxTrue);



taxLayer.add(prodSurplus);
stage.add(taxLayer);
prodSurplus.moveToBottom();
equilibrium.moveToTop();
stage.draw();

function whenTaxTrue(){

  if (firstTaxInput){
  submitClicked();
  //sup line tax!!!!!!
  supLineUnitTax = new Konva.Line({
    points: [demLine.points()[0], demLine.points()[1] - unitTax, demLine.points()[2], demLine.points()[3] - unitTax],
    stroke: 'red',
    strokeWidth: 2,
    opacity: 1,
  })
  taxLayer.add(supLineUnitTax);





// half Pu equilbrium (half opoacity)

  var pux = findPoints(supLineUnitTax, supLine)[0];
  var puy = findPoints(supLineUnitTax, supLine)[1];
    puEquilbrium = new Konva.Circle({
    radius: 10,
    fill: "#ABFF4F",
    x: pux,
    y: puy,
    opacity: 0.6,
  });

  taxLayer.add(puEquilbrium);
  taxLayer.draw();

  //full opacity puEq
console.log(puEquilbrium.x());
   newPuEq = new Konva.Circle({
    x: findYofNewEq()[0],
    y: findYofNewEq()[1],
    radius: 10,
    fill: '#ABFF4F',
    opacity: 1,
  });
  
  
  taxLayer.add(newPuEq);


//tax revenue
 taxRevenue = new Konva.Line({
  points: [0, puEquilbrium.y(), puEquilbrium.x(), puEquilbrium.y(), newPuEq.x(), newPuEq.y(), 0, newPuEq.y()],
  fill: 'pink',
  opacity: 0.5,
  closed: true,
  });

taxLayer.add(taxRevenue);

//dwl
 dwl = new Konva.Line({
  points: [taxRevenue.points[2], taxRevenue.points[3], equilibrium.x(), equilibrium.y(), taxRevenue.points[4], taxRevenue.points[5]],
  fill: 'purple',
  opacity: 0,
  closed: true,
})
taxLayer.add(dwl);
 taxLabel = new Konva.Text ({
  x: 0,
  y: ((taxRevenue.points()[1] + taxRevenue.points()[3])/2),
  text: 'tax revenue',
  fill: 'white',
  fontSize: 30,
  opacity: 0,
});
taxLayer.add(taxLabel);






taxLayer.add(psuLabel);

 dwlLabel = new Konva.Text({
x: dwl.points()[0],
y: dwl.points()[4],
text: 'DWL',
fill: 'white',
fontSize: 15,
opacity: 0
});
taxLayer.add(dwlLabel);

updateSupUnitTax();

moveBothLines(supLine, supLineAnchorLeft, supLineAnchorRight);
firstTaxInput = false;


taxRevenue.on('mouseover', function () {
  catSpeak('taxRevenue');
});

dwl.on('mouseover', function () {
catSpeak('dwl');
});

taxRevenue.on('mouseout', function () {
  resetCatSpeak();
});

dwl.on('mouseout', function () {
resetCatSpeak();
});

  } else {
    submitClicked();
    updateSupUnitTax();
    updateEverythingWPU();




  }



}





  ///REMOVE LATER!!!!!!!!!!!
//var eventClick = new Event('click');
  //document.getElementById("taxSubmit").dispatchEvent(eventClick);