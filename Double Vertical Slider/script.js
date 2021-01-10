(function (document) {
  const mySlidesManager = (function () {
    let currentSlide, slides;
    const animationSlideDelay = 5;

    function initialize(_slides) {
      slides = _slides;
      resetSlides();
      updateCurrentSlide();
    }

    function movePageUp() {
      if (currentSlide.index === 0) {
        animateMoveToBottomSlide();
      } else {
        currentSlide.slide.classList.remove('current');
        currentSlide.slide.classList.add('below');
        currentSlide.slide.previousElementSibling.classList.remove('above');
        currentSlide.slide.previousElementSibling.classList.add('current');
        updateCurrentSlide();
      }
    }

    function movePageDown() {
      if (currentSlide.index === slides.length - 1) {
        animateMoveToTopSlide();
      } else {
        currentSlide.slide.classList.remove('current');
        currentSlide.slide.classList.add('above');
        currentSlide.slide.nextElementSibling.classList.remove('below');
        currentSlide.slide.nextElementSibling.classList.add('current');
        updateCurrentSlide();
      }
    }

    async function animateMoveToBottomSlide() {
      for (let index = 0; index <= slides.length - 1; index++) {
        if (slides[index].nextElementSibling) {
          slides[index].classList.remove('current');
          slides[index].classList.add('above');
          slides[index].nextElementSibling.classList.remove('below');
          slides[index].nextElementSibling.classList.add('current');
          await delay(animationSlideDelay);
        }
      }
      updateCurrentSlide();
    }

    async function animateMoveToTopSlide() {
      for (let index = slides.length - 1; index >= 0; index--) {
        if (slides[index].previousElementSibling) {
          slides[index].classList.remove('current');
          slides[index].classList.add('below');
          slides[index].previousElementSibling.classList.remove('above');
          slides[index].previousElementSibling.classList.add('current');
          await delay(animationSlideDelay);
        }
      }
      updateCurrentSlide();
    }

    function resetSlides() {
      slides.forEach((slide, index) => {
        slide.classList.remove('current');
        slide.classList.remove('above');

        if (index > 0) {
          slide.classList.add('below');
        }
      });
      slides[0].classList.add('current');
    }

    function updateCurrentSlide() {
      for (let index = 0; index <= slides.length - 1; index++) {
        if (slides[index].classList.contains('current')) {
          currentSlide = { slide: slides[index], index: index };
          return;
        }
      }
    }

    async function delay(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    }

    return {
      initialize: initialize,
      slideUp: movePageUp,
      slideDown: movePageDown,
    };
  })();

  const slides = document.querySelectorAll('.slide');
  const buttonUp = document.getElementById('button-up');
  const buttonDown = document.getElementById('button-down');

  mySlidesManager.initialize(slides);

  buttonUp.addEventListener('click', mySlidesManager.slideUp);
  buttonDown.addEventListener('click', mySlidesManager.slideDown);
})(document);
