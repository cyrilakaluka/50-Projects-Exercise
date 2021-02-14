const controls = document.querySelectorAll('.ui-control');
const frames = document.querySelectorAll('.image-frame');

controls.forEach(control => {
  control.addEventListener('click', () => {
    const frame = enableControl(control);
    disableAllBut(control, frame);
  });
});

function enableControl(control) {
  control.classList.add('active');
  const frame = Array.from(frames).find(frame => frame.id === 'image-' + control.id);
  if (frame) frame.classList.add('show');
  return frame;
}

function disableAllBut(control, frame) {
  controls.forEach(item => {
    if (item !== control) {
      item.classList.remove('active');
    }
  });

  frames.forEach(item => {
    if (item !== frame) {
      item.classList.remove('show');
    }
  });
}

function initUI() {
  const home = document.getElementById('home');
  const frame = document.getElementById('image-home');

  enableControl(home);
  disableAllBut(home, frame);
}

initUI();
