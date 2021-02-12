const counter = document.getElementById('counter');
const countdown = document.getElementById('countdown');
const countEnd = document.getElementById('count-end');
const replay = document.getElementById('replay');

const ANIMATION_TIMING = 500;
const COUNT_RANGE = 5;

counter.style.animationDuration = ANIMATION_TIMING * 0.001 + 's';

async function delay(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

function resetCountdown() {
  countdown.classList.remove('hide');
  counter.classList.remove('enter');
  counter.classList.remove('escape');
  countEnd.classList.remove('show');
}

async function playCountdown() {
  resetCountdown();

  for (let i = 0; i <= COUNT_RANGE; i++) {
    counter.innerText = i;
    counter.classList.add('enter');
    await delay(ANIMATION_TIMING);
    counter.classList.remove('enter');
    counter.classList.add('escape');
    await delay(ANIMATION_TIMING);
    counter.classList.remove('escape');
  }

  countdown.classList.add('hide');
  countEnd.classList.add('show');
}

replay.addEventListener('click', playCountdown);

playCountdown();
