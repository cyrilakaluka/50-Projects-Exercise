const progress = document.getElementById('progress__line');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.progress__circle');

let currentActive = 1;

next.addEventListener('click', () => {
  currentActive++;

  if (currentActive > circles.length) {
    currentActive = circles.length;
  }

  updateProgress();
});

prev.addEventListener('click', () => {
  currentActive--;

  if (currentActive < 1) {
    currentActive = 1;
  }

  updateProgress();
});

function updateProgress() {
  circles.forEach((circle, index) => {
    if (index < currentActive) {
      circle.classList.add('progress__circle--active');
    } else {
      circle.classList.remove('progress__circle--active');
    }
  });

  progress.style.width =
    ((currentActive - 1) / (circles.length - 1)) * 100 + '%';

  if (currentActive > 1) {
    prev.disabled = false;
  } else {
    prev.disabled = true;
  }

  if (currentActive < circles.length) {
    next.disabled = false;
  } else {
    next.disabled = true;
  }
}
