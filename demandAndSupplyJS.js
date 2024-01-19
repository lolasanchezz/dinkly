
var sceneWidth = 500;
var sceneHeight = 500;
var scaleX = 1;
var scaleY = 1;

var stage = new Konva.Stage({
  container: 'canvasContainer',   // id of container <div>
  width: sceneWidth,
  height: sceneHeight,
  id: "konvaStage",
});
var demAndSupLinesLayer = new Konva.Layer();


function fitSceneIntoDiv (){
  var container = document.getElementById('canvasContainer');
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;
  
  var changeInScaleX = 500-(500-containerWidth);
  var changeInScaleY = 500-(500-containerHeight);
  var scale = Math.min(changeInScaleX, changeInScaleY);
  return scale;
}
function checkDivHeightAndWidth (){
var parentCanvasDiv = document.getElementById('canvasContainer');
var divWidth = parentCanvasDiv.offsetWidth;
var divHeight = parentCanvasDiv.offsetHeight;
if ((divWidth <= 700) || (divHeight <=700)) {
stage.width(fitSceneIntoDiv());
stage.height(fitSceneIntoDiv());
console.log(stage.width());
console.log(stage.height());
}
}
window.addEventListener('resize', checkDivHeightAndWidth);

var supLine = new Konva.Line({
  points: [0,0,stage.width(),stage.height()],
  stroke: 'black',
  strokeWidth: 5,
});
var demLine = new Konva.Line({
  points: [0, stage.height(), stage.width(),0],
  stroke: 'black',
  strokeWidth: 5,
})
demAndSupLinesLayer.add(supLine);
demAndSupLinesLayer.add(demLine);
stage.add(demAndSupLinesLayer);
console.log("hii");