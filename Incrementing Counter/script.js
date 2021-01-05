const youtubeCounter = document.querySelector('#youtube .social__count');
const twitterCounter = document.querySelector('#twitter .social__count');
const facebookCounter = document.querySelector('#facebook .social__count');

const counts = [twitterCounter, youtubeCounter, facebookCounter];

const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/* Implementation with asynchronous call */

async function increment(element, start, interval, duration, targetCount) {
  const loopCount = duration / interval;
  const countInterval = Math.ceil(targetCount / loopCount);

  for (let i = start; i < loopCount; i++) {
    element.innerText = i * countInterval;
    await delay(interval);
  }
  element.innerText = targetCount;
}

counts.forEach((count) => {
  increment(count, 0, 10, 2000, count.getAttribute('data-target'));
});

/* Implementation with recursive asynchronous call */

// counts.forEach((count) => {
//   const targetCount = count.getAttribute('data-target');
//   const increment = targetCount / 214;
//   count.innerText = '0';

//   (function updateCounter() {
//     let currentCount = +count.innerText;

//     if (currentCount < targetCount) {
//       count.innerText = Math.ceil(currentCount + increment);
//       delay(10).then(updateCounter);
//     } else {
//       count.innerText = targetCount;
//     }
//   })();
// });
