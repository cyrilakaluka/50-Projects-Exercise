const prev = document.getElementById('previous');
const next = document.getElementById('next');

const Carousel = (function () {
  let intervalCount = 0;
  let intervalId = 0;

  function playSlide() {
    if (intervalCount >= this.children.length - 1) {
      intervalCount = 0;
    } else {
      intervalCount++;
    }

    transform.call(this);
  }

  function slide(callback) {
    this.reset();
    callback();
    transform.call(this);
    this.play();
  }

  function transform() {
    this.carousel.style.transform = `translateX(${-100 * intervalCount}%)`;
  }

  class Carousel {
    constructor() {
      this.carousel = document.getElementById('carousel');
      this.children = document.querySelectorAll('.carousel__img-frame');
      this.intervalId = 0;
    }

    static get INTERVAL() {
      return 2500;
    }

    play = () => {
      intervalId = setInterval(playSlide.bind(this), Carousel.INTERVAL);
    };

    reset = () => {
      clearInterval(intervalId);
    };

    slideLeft = () => {
      slide.call(this, () => {
        intervalCount = intervalCount === 0 ? this.children.length - 1 : intervalCount - 1;
      });
    };

    slideRight = () => {
      slide.call(this, () => {
        intervalCount = intervalCount === this.children.length - 1 ? 0 : intervalCount + 1;
      });
    };
  }

  return Carousel;
})();

const carousel = new Carousel();
carousel.play();

prev.addEventListener('click', carousel.slideLeft);
next.addEventListener('click', carousel.slideRight);
