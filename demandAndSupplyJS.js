
var sceneWidth = 500;
var sceneHeight = 500;
var scaleX = 1;
var scaleY = 1;
var firstTime = true;

var squareWidth = 25;
var taxShown = false;
var unitTax = 100;
var firstTaxInput = true;
var invisLine;
var catNoise = new Audio('assets/catNoise.mp3')
var frontLayer = new Konva.Layer();

var demAndSupLinesLayer = new Konva.Layer();
var backgroundLayer = new Konva.Layer();
var taxLayer = new Konva.Layer();
//tax empty vars

var puEquilbrium;
var supLineUnitTax;
var newPuEq;
var taxRevenue;
var dwl;
var taxLabel;
var dwlLabel;



var stage = new Konva.Stage({
  container: 'canvasContainer',   // id of container <div>
  width: sceneWidth,
  height: sceneHeight,
  id: "konvaStage", 
});




//function for seeing which way the mouse is moving
let prevX = 0;
let prevY = 0;
let mouseMovement = ''
var slineR = 'bottom';
var slineL = 'bottom';
var dlineR = 'bottom';
var dlineR = 'bottom';
document.addEventListener('mousemove', function(event) {
    let currentX = event.clientX;
    let currentY = event.clientY;
   if ((Math.abs(currentX-prevX) > Math.abs(currentY-prevY))) {
    mouseMovement = 'horizontal';
   } else {
     mouseMovement = 'vertical';
   }
   prevX = currentX;
   prevY = currentY;
});


const demLineAnchorLeft = new Konva.Circle({
  x: 0,
  y: 0,
  radius: 50,
  stroke: 'black',
  strokeWidth: 1,
  draggable: true,
  dragBoundFunc: function(pos) {
    //  setting lines to circles thing
    let line = demLine;
    let endFunction = function(x,y, returnPos){
      line.points()[x] = returnPos.x;
      line.points()[y] = returnPos.y;
      remapEquilibrium();
      updateProdSurplus();
      putInMRS();
      taxLayer.batchDraw();
    };
    //making sure the right anchor doestt go past the left anchor
    if (pos.x > demLineAnchorRight.x() - squareWidth){
      let returnPos = {
        x: demLineAnchorRight.x() - squareWidth,
        y: pos.y
      };
      endFunction(0,1, returnPos);
      return returnPos;
    };
    //turning point of switching axes
    if (((pos.x <= squareWidth))){
      if (mouseMovement == 'vertical') {
        slineL = 'left'
      let returnPos ={
        x: 0,
        y: pos.y
    };
    endFunction(0,1, returnPos);
    return returnPos;
  } else if (mouseMovement == 'horizontal') {
    slineL = 'top'
    let returnPos = {
      x: pos.x,
      y: 0,
    }
    endFunction(0,1, returnPos);
    return returnPos;
  };
    } else {
      if (slineL =='left') {
        let returnPos = {
          x: 0,
          y: pos.y,
        }
        endFunction(0,1, returnPos);
        return returnPos;
      } else if (slineL == 'top'){
        let returnPos ={
          x: pos.x,
          y: 0,
        }
        endFunction(0,1, returnPos);
      return returnPos;
      }
  
    }
  }
});

const supLineAnchorRight = new Konva.Circle({
  x: stage.width(),
  y: 0,
  radius: 50,
  
  stroke: 'black',
  strokeWidth: 0.5,
  draggable: true,
  dragBoundFunc: function(pos) {
    //  setting lines to circles thing
    let line = supLine;

    let endFunction = function(x,y, returnPos){
      line.points()[x] = returnPos.x;
      line.points()[y] = returnPos.y;
      remapEquilibrium();
      updateProdSurplus();
      putInMRS();
      taxLayer.batchDraw();
    };
    
    //making sure the right anchor doestt go past the left anchor
    if (Math.abs(pos.x - line.points()[0]) < squareWidth){
      let returnPos = {
        x: supLineAnchorLeft.x() + squareWidth,
        y: pos.y 
      };
      endFunction(2,3, returnPos);
      return returnPos;
    };
    //turning point of switching axes
    if (((pos.x >= stage.width() - squareWidth))){
      if (mouseMovement == 'vertical') {
        slineR = 'right'
      let returnPos ={
        x: stage.width(),
        y: pos.y
    };
    endFunction(2,3, returnPos);
    return returnPos;
  } else if (mouseMovement == 'horizontal') {
    slineR = 'top'
    let returnPos = {
      x: pos.x,
      y: 0,
    }
    endFunction(2,3, returnPos);
    return returnPos;
  };
    } else {
      if (slineR =='right') {
        let returnPos = {
          x: stage.width(),
          y: pos.y,
        }
        endFunction(2,3, returnPos);
        return returnPos;
      } else if (slineR == 'top'){
        let returnPos ={
          x: pos.x,
          y: 0,
        }
        endFunction(2,3, returnPos);
        return returnPos;
      }
  
    }
  }
})
demAndSupLinesLayer.add(supLineAnchorRight);


const supLineAnchorLeft = new Konva.Circle({
  x: 0,
  y: stage.height(),
  radius: 50,
  
  stroke: 'black',
  strokeWidth: 0.5,
  draggable: true,
  dragBoundFunc: function(pos) {
    //  setting lines to circles thing
    let line = supLine;
    let endFunction = function(x,y, returnPos){
      line.points()[x] = returnPos.x;
      line.points()[y] = returnPos.y;
      remapEquilibrium();
      updateProdSurplus();
      putInMRS();
      taxLayer.batchDraw();
    };
    if (((pos.x <= squareWidth))){
      if (mouseMovement == 'vertical') {
        slineL = 'left'
      let returnPos ={
        x: 0,
        y: pos.y
    };
    endFunction(0,1, returnPos);
    return returnPos;
  } else if (mouseMovement == 'horizontal') {
    slineL = 'bottom'
    let returnPos = {
      x: pos.x,
      y: stage.height()
    }
    endFunction(0,1, returnPos);
    return returnPos;
  };
    } else {
      if (slineL =='left') {
        let returnPos = {
          x: 0,
          y: pos.y,
        }
        endFunction(0,1, returnPos);
        return returnPos;
      } else if (slineL == 'bottom'){
        let returnPos ={
          x: pos.x,
          y: stage.height(),
        }
        endFunction(0,1, returnPos);
        return returnPos;
      }

    }
    //end of setting lines to circles thing







  }
})
demAndSupLinesLayer.add(demLineAnchorLeft);

const demLineAnchorRight = new Konva.Circle({
  x: stage.width(),
  y: stage.height(),
  radius: 50,
  
  stroke: 'black',
  strokeWidth: 0.5,
  draggable: true,

  //dragging function!!
  dragBoundFunc: function(pos) {
    //  setting lines to circles thing
    let line = demLine;
    let endFunction = function(x,y, returnPos){
      line.points()[x] = returnPos.x;
      line.points()[y] = returnPos.y;
      remapEquilibrium();
      updateProdSurplus();
      putInMRS();
      taxLayer.batchDraw();
    };
    
    //making sure the right anchor doestt go past the left anchor
    if (Math.abs(pos.x - line.points()[0]) < squareWidth){
      let returnPos = {
        x: demLineAnchorLeft.x() + squareWidth,
        y: pos.y
      };
      endFunction(0,1, returnPos);
    return returnPos;
    };
    //turning point of switching axes
    if (((pos.x >= stage.width() - squareWidth))){
      if (mouseMovement == 'vertical') {
        dlineR = 'right'
      let returnPos ={
        x: stage.width(),
        y: pos.y
    };
    endFunction(2,3, returnPos);
    return returnPos;
  } else if (mouseMovement == 'horizontal') {
    dlineR = 'bottom'
    let returnPos = {
      x: pos.x,
      y: stage.height()
    }
    endFunction(2,3, returnPos);
    return returnPos;
  };
    } else {
      if (dlineR =='right') {
        let returnPos = {
          x: stage.width(),
          y: pos.y,
        }
        endFunction(2,3, returnPos);
        return returnPos;
      } else if (dlineR == 'bottom'){
        let returnPos ={
          x: pos.x,
          y: stage.height(),
        }
        endFunction(2,3, returnPos);
    return returnPos;
      }
  
    }
  }
});
demAndSupLinesLayer.add(demLineAnchorRight);



var demLine = new Konva.Line({
  points: [0, 0, stage.width(), stage.height()],
  stroke: "black",
  strokeWidth: 2,
  listening: true,
});
var supLine = new Konva.Line({
  points: [0, stage.height(), stage.width(), 0],
  stroke: "black",
  strokeWidth: 2,
  listening: true,
});

var equilibrium = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 10,
  fill: "#ABFF4F"
  
});

stage.add(frontLayer);



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
    return[sharedXcoord,sharedYcoord,sl1,sl2];
  } else {
  var sharedXcoord = ((line1Yint - line2Yint)/(sl2-sl1));
  var sharedYcoord =sl1*sharedXcoord + line1Yint;
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

 
  xPos = stage.width();
  yPos = 0;
  console.log(stage.height());
 
  stage.add(backgroundLayer);
}

// no functions below here!!!!!!!!  =^.  ̫.^=  --  >w<







demAndSupLinesLayer.add(supLineAnchorLeft);


demAndSupLinesLayer.add(demLineAnchorRight);

var isSupLine;

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
  supLineUnitTax.points([supLine.points()[0], supLine.points()[1] - unitTax, supLine.points()[2], supLine.points()[3] - unitTax]);
  taxLayer.batchDraw();
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
}



stage.add(demAndSupLinesLayer);
stage.draw();

 
taxLayer.batchDraw();




taxLayer.batchDraw();

function updateNewPuEq(){
  newPuEq.x(findYofNewEq()[0]);
  newPuEq.y(findYofNewEq()[1]);
  newPuEq.opacity(1);
}





taxLayer.batchDraw();

function updateEverythingWPU(){
//update sup tax line
updateSupUnitTax();



// tax revenue
var taxRevPoints = [0, puEquilbrium.y(), puEquilbrium.x(), puEquilbrium.y(), newPuEq.x(), newPuEq.y(), 0, newPuEq.y()]
taxRevenue.points(taxRevPoints);

// cons surplus
updateProdSurplus();

// prod surplus
updateProdSurplus();
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
      
      
      frontLayer.batchDraw();
    
    cds.moveToTop();
}
}

stage.on("mousedown", function () {
  
      delayedShow();

});

stage.on("mouseup", function () {
cds.opacity(0);
});






function updateProdSurplus(){

var newNewPoints = [0, 0, 0, equilibrium.y(), equilibrium.x(), equilibrium.y(), demLine.points()[0], demLine.points()[1]];
//TODO figure out why this breaks the demand line movement??????? huh????????????????????????????????
/*
if ((demLine.points()[0] = 0)&&(demLine.points()[1]>0)){
  newNewPoints[0] = demLine.points()[0];
  newNewPoints[1] = demLine.points()[1];
}
  */
  consSurplus.points(newNewPoints);
  

  
  taxLayer.batchDraw();
  var points = [0, stage.height(), supLine.points()[0], supLine.points()[1], equilibrium.x(), equilibrium.y(), 0, equilibrium.y()];
  prodSurplus.points(points);
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










function putInMRS(){
var mrsOfDem = document.getElementById("mrsOfDem");
var mrsOfSup = document.getElementById("mrsOfSup");
// Extracting the coordinates of the points

//new quantity is the one at the beginning of the line mesay
var demandElasticity = (((demLine.points()[2] - demLine.points()[0])/(demLine.points()[2])/2)/((demLine.points()[3] - demLine.points()[1])/(demLine.points()[3] + demLine.points()[1])/2));

// Determine the type of elasticity
var measureElasticityDem;
if (demandElasticity > 1){
   measureElasticityDem = `inelastic (${demandElasticity.toFixed(2)})`

} else if (demandElasticity < 1){
   measureElasticityDem =  `elastic (${demandElasticity.toFixed(2)})`
   ;
} else {
   measureElasticityDem = "unit elastic";
}



mrsOfDem.textContent = "demand is: " + measureElasticityDem;

//elasticity of supply
var supElasticity = (((supLine.points()[2] - supLine.points()[0])/(supLine.points()[2])/2)/((supLine.points()[3] - supLine.points()[1])/(supLine.points()[3] + supLine.points()[1])/2));

// Determine the type of elasticity
var measureElasticitySup;
if (Math.abs(supElasticity) > 1){
  measureElasticitySup = `inelastic (${Math.abs(supElasticity.toFixed(2))})`

} else if (Math.abs(supElasticity) < 1){
  measureElasticitySup =  `elastic (${Math.abs(supElasticity.toFixed(2))})`
   ;
} else {
  console.log(measureElasticitySup + '33')
  measureElasticitySup = "unit elastic";
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
  supLine.points([0, stage.height(), stage.width(), 0]);
  demLine.points([0, 0, stage.width(), stage.height()]);
 

  supLineAnchorLeft.x(0);
  supLineAnchorLeft.y(stage.height());

  supLineAnchorRight.x(stage.width());
  supLineAnchorRight.y(0);
  
  demLineAnchorLeft.x(0);
  demLineAnchorLeft.y(0);
  
  demLineAnchorRight.x(stage.width());
  demLineAnchorRight.y(stage.height());



  remapEquilibrium();
  demAndSupLinesLayer.batchDraw();
  // ANCHOR add the everything function here
  putInMRS();
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
catNoise.play();
}
function resetCatSpeak(){
  document.getElementById("chatText").textContent = "meow meow meow";
  document.getElementById("catModel").src = "assets/dinklyCat.gltf";
  catNoise.pause();
}

function submitClicked(){
  if (document.getElementById("taxInput").value == ""){
    return;
  } else {
    unitTax = document.getElementById("taxInput").value;
    taxShown = true;
    
  
  }
}

document.getElementById("taxSubmit").addEventListener("click", whenTaxTrue);



taxLayer.add(prodSurplus);
stage.add(taxLayer);
prodSurplus.moveToBottom();
equilibrium.moveToTop();
stage.draw();


// SECTION functino that's originally run when tax is implemented
function whenTaxTrue(){

  if (firstTaxInput){
  submitClicked();
  //sup line tax!!!!!!
  supLineUnitTax = new Konva.Line({
    points: [supLine.points()[0], supLine.points()[1] - unitTax, supLine.points()[2], supLine.points()[3] - unitTax],
    stroke: 'red',
    strokeWidth: 2,
    opacity: 1,
  })
  taxLayer.add(supLineUnitTax);





// half Pu equilbrium (half opoacity)

  

  //full opacity puEq
//finding the puEQ in a new way!!
//slopeOfDem = (demLine.points()[3] - demLine.points()[1])/(demLine.points()[2] - demLine.points()[0]);
//yIntOfDem = demLine.points()[1] - ((demLine.points()[3] - demLine.points()[1])/(demLine.points()[2] - demLine.points()[0]) * demLine.points()[0]);

//slopeOfNewSup = (supLineUnitTax.points()[3] - supLineUnitTax.points()[1])/(supLineUnitTax.points()[2] - supLineUnitTax.points()[0]);
//yIntOfNewSup = supLineUnitTax.points()[1] - ((supLineUnitTax.points()[3] - supLineUnitTax.points()[1])/(supLineUnitTax.points()[2] - supLineUnitTax.points()[0]) * supLineUnitTax.points()[0]);
var puEQx = ((supLineUnitTax.points()[1] - ((supLineUnitTax.points()[3] - supLineUnitTax.points()[1])/(supLineUnitTax.points()[2] - supLineUnitTax.points()[0]) * supLineUnitTax.points()[0])) - (demLine.points()[1] - ((demLine.points()[3] - demLine.points()[1])/(demLine.points()[2] - demLine.points()[0]) * demLine.points()[0])))/((demLine.points()[3] - demLine.points()[1])/(demLine.points()[2] - demLine.points()[0]) - (supLineUnitTax.points()[3] - supLineUnitTax.points()[1])/(supLineUnitTax.points()[2] - supLineUnitTax.points()[0]));
var puEQy = (demLine.points()[3] - demLine.points()[1])/(demLine.points()[2] - demLine.points()[0]) * puEQx + (demLine.points()[1] - ((demLine.points()[3] - demLine.points()[1])/(demLine.points()[2] - demLine.points()[0]) * demLine.points()[0]));

   newPuEq = new Konva.Circle({
    x: ((supLineUnitTax.points()[1] - ((supLineUnitTax.points()[3] - supLineUnitTax.points()[1])/(supLineUnitTax.points()[2] - supLineUnitTax.points()[0]) * supLineUnitTax.points()[0])) - (demLine.points()[1] - ((demLine.points()[3] - demLine.points()[1])/(demLine.points()[2] - demLine.points()[0]) * demLine.points()[0])))/((demLine.points()[3] - demLine.points()[1])/(demLine.points()[2] - demLine.points()[0]) - (supLineUnitTax.points()[3] - supLineUnitTax.points()[1])/(supLineUnitTax.points()[2] - supLineUnitTax.points()[0])),
    y: (demLine.points()[3] - demLine.points()[1])/(demLine.points()[2] - demLine.points()[0]) * newPuEq().x + (demLine.points()[1] - ((demLine.points()[3] - demLine.points()[1])/(demLine.points()[2] - demLine.points()[0]) * demLine.points()[0])),
    radius: 10,
    fill: '#ABFF4F',
    opacity: 1,
  });
  

    puEquilbrium = new Konva.Circle({
    radius: 10,
    fill: "#ABFF4F",
    x: newPuEq.x(),
    y: newPuEq.y() + unitTax,
    opacity: 0.6,
  });

  taxLayer.add(puEquilbrium);
  taxLayer.draw();
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