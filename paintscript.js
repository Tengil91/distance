let canvas = document.getElementById('overlay-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext('2d');
let prevX, prevY;
let drawings = [];
painting = false;
window.addEventListener('mousedown', startDrawing);
window.addEventListener('mouseup', stopDrawing);
window.addEventListener('keyup', tools);

function startDrawing(e){
  painting = true;
  drawings.push([])
  console.log('started drawing')
  window.addEventListener('mousemove', drawLineHandler);
  prevX = e.clientX;
  prevY = e.clientY;
  drawDot(e.clientX, e.clientY);
}
function stopDrawing(){
  window.removeEventListener('mousemove', drawLineHandler);
  console.log(drawings);
  painting = false;
}
function drawLineHandler(e){
  drawLine(prevX, prevY, e.clientX, e.clientY, ctx.lineWidth, ctx.fillStyle);
}
function drawLine(x0, y0, x1, y1, width, color){
  ctx.lineWidth = width;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  let r = width % 2 == 0 ? width/2 : (width-1)/2;
  drawDot(x1, y1, r, color);
  prevX = x1;
  prevY = y1;
}
function drawDot(x, y, r, color){
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  if(painting){
    drawings[drawings.length-1].push({x: x, y: y, width: ctx.lineWidth, color: ctx.fillStyle});
  }
}
function clearDrawing(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //could be nice to undo a clear in the future 
  drawings = [];
}
function drawAll(){
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(drawings)
  drawings.forEach(drawing => {
    for(let i=1;i<drawing.length;i++){
      console.log(drawing[i].color);
      drawLine(drawing[i-1].x, drawing[i-1].y, drawing[i].x, drawing[i].y, drawing[i].width, drawing[i].color);
    }
  });
  ctx.restore();
}
function undoStroke(){
  drawings.pop();
  drawAll();
}

function tools(e){
  e.preventDefault();
  //change color
  if(e.keyCode === 82){
    ctx.fillStyle = "#FF0000";
    ctx.strokeStyle = "#FF0000";
    return;
  }
  if(e.keyCode === 71){
    ctx.fillStyle = '#00FF00';
    ctx.strokeStyle = '#00FF00';
    return;
  }
  if(e.keyCode === 66){
    ctx.fillStyle = '#0000FF';
    ctx.strokeStyle = '#0000FF';
    return;
  }
  if(e.keyCode === 83){
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    return;
  }
  if(e.keyCode === 86){
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#FFFFFF';
    return;
  }
  //change size
  if(e.keyCode === 49){
    ctx.lineWidth = 2;
    return;
  }
  if(e.keyCode === 50){
    ctx.lineWidth = 4;
    return;
  }
  if(e.keyCode === 51){
    ctx.lineWidth = 10;
    return;
  }
  if(e.keyCode === 67){
    clearDrawing();
  }
  if(e.keyCode === 90){
    undoStroke();
  }

  return;
}