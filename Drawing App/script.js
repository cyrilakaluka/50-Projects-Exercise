const myCanvas = (function () {
  let canvas,
    context,
    x1,
    y1,
    x2,
    y2,
    size = 19,
    color = 'black',
    doDraw = false;

  const create = (c) => {
    canvas = c.canvas;
    context = c.canvas.getContext('2d');
    setSize(c.size);
    setColor(c.color);
  };

  const init = function (event) {
    x1 = event.offsetX;
    y1 = event.offsetY;
    drawCircle();
    doDraw = true;
  };

  const draw = function (event) {
    if (doDraw) {
      x2 = event.offsetX;
      y2 = event.offsetY;
      drawCircle();
      drawLine();
      x1 = x2;
      y1 = y2;
    }
  };

  const reset = function () {
    x1 = undefined;
    x2 = undefined;
    y1 = undefined;
    y2 = undefined;
    doDraw = false;
  };

  const setSize = function (s) {
    if (!isNaN(s) && s >= 5 && s <= 50) {
      size = s;
    }
  };

  const getSize = function () {
    return size;
  };

  const setColor = function (c) {
    color = c;
  };

  const clear = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  function drawCircle() {
    context.beginPath();
    context.arc(x1, y1, size, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  }

  function drawLine() {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color;
    context.lineWidth = size * 2;
    context.stroke();
  }

  return {
    create: create,
    init: init,
    draw: draw,
    reset: reset,
    clear: clear,
    setSize: setSize,
    getSize: getSize,
    setColor: setColor,
  };
})();

const canvas = document.getElementById('canvas');
const decrease = document.getElementById('decrease');
const increase = document.getElementById('increase');
const size = document.getElementById('size');
const color = document.getElementById('color');
const clear = document.getElementById('clear');

myCanvas.create({ canvas: canvas, size: size.innerText, color: color.value });

canvas.addEventListener('mousedown', myCanvas.init);

canvas.addEventListener('mouseup', myCanvas.reset);

canvas.addEventListener('mousemove', myCanvas.draw);

increase.addEventListener('click', (e) => {
  myCanvas.setSize(Number(size.innerText) + 5);
  size.innerText = myCanvas.getSize();
});

decrease.addEventListener('click', (e) => {
  myCanvas.setSize(Number(size.innerText) - 5);
  size.innerText = myCanvas.getSize();
});

color.addEventListener('input', () => myCanvas.setColor(color.value));

clear.addEventListener('click', myCanvas.clear);
