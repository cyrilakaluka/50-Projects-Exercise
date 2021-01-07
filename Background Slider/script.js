const body = document.body;
const sliders = document.getElementsByClassName('slider');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');

leftButton.addEventListener('click', () => slideInDirection('backward'));
rightButton.addEventListener('click', () => slideInDirection('forward'));

function setRandomActiveSlider() {
  const randomIndex = randomInteger(0, sliders.length - 1);

  Array.from(sliders).forEach((slider, index) => {
    if (index === randomIndex) {
      slider.classList.add('active');
    } else {
      slider.classList.remove('active');
    }
  });
}

function setBodyBgToActiveImage() {
  const activeSlider = getActiveSlider();
  body.style.backgroundImage = activeSlider?.style.backgroundImage;
}

function getActiveSlider() {
  return Array.from(sliders).find((slider) => {
    return slider.classList.contains('active');
  });
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function slideInDirection(direction) {
  const activeSlider = getActiveSlider();
  activeSlider.classList.remove('active');
  let nextSlider = getNextSlider(activeSlider, direction);
  nextSlider.classList.toggle('active');
  body.style.backgroundImage = nextSlider.style.backgroundImage;
}

function getNextSlider(activeSlider, direction) {
  if (direction === 'forward') {
    if (activeSlider.nextElementSibling) {
      return activeSlider.nextElementSibling;
    } else {
      return activeSlider.parentElement.firstElementChild;
    }
  } else {
    if (activeSlider.previousElementSibling) {
      return activeSlider.previousElementSibling;
    } else {
      return activeSlider.parentElement.lastElementChild;
    }
  }
}

setRandomActiveSlider();
setBodyBgToActiveImage();
