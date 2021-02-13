const hoverBoard = document.getElementById('hover-board');
const root = document.documentElement;

const HOVER_BOXES = 500;

for (let i = 0; i < HOVER_BOXES; i++) {
  const box = document.createElement('div');
  box.classList.add('hover-box');
  hoverBoard.append(box);
}

hoverBoard.addEventListener('mouseover', e => {
  const [r, g, b] = getRandomColor();
  e.target.style.setProperty('--random-color', `rgb(${r}, ${g}, ${b})`);
});

function hsvToRgb(h, s, v) {
  const h_i = Math.floor(h * 6);
  const f = h * 6 - h_i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let [r, g, b] =
    h_i === 0
      ? [v, t, p]
      : h_i === 1
      ? [q, v, p]
      : h_i === 2
      ? [p, v, t]
      : h_i === 3
      ? [p, q, v]
      : h_i === 4
      ? [t, p, v]
      : [v, p, q];

  return [r, g, b].map(item => Math.floor(item * 256));
}

function getRandomColor() {
  const goldenRatioConjugate = 0.618033988749895;
  // generate a random starting hue
  let hue = Math.random();
  hue += goldenRatioConjugate;
  hue %= 1;
  return hsvToRgb(hue, 0.99, 0.99);
}
