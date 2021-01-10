const image = document.getElementById('image');
const likes = document.getElementById('likes');
const heart = document.getElementById('heart');

// addDoubleClickEventListener with asynchronous promise
// async function addDoubleClickEventListener(domElement, callback) {
//   let event;
//   try {
//     // await promise for first click event
//     event = await new Promise(resolve => {
//       domElement.addEventListener('click', e => resolve(e));
//     });

//     // await promise for second click with timeout to reject
//     event = await new Promise((resolve, reject) => {
//       event.target.addEventListener('click', e => resolve(e));
//       setTimeout(() => reject(event), 800);
//     });
//   } catch (err) {}
//   callback(event);
//   addDoubleClickEventListener(domElement, callback);
// }

// addDoubleClickEvent with synchronous code
const addDoubleClickEventListener = (() => {
  let clickTime = 0;
  return (element, callback) => {
    element.addEventListener('click', e => {
      if (clickTime === 0) {
        clickTime = new Date().getTime();
      } else {
        if (new Date().getTime() - clickTime < 500) {
          callback(e);
          clickTime = 0;
        } else {
          clickTime = new Date().getTime();
        }
      }
    });
  };
})();

const generateRegisterLikesCount = element => {
  let numberOfLikes = 0;
  return () => {
    element.innerText = ++numberOfLikes;
  };
};

function offset(element) {
  let rect = element.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

function heartElement(mouseEvent, target) {
  const elOffset = offset(target);
  // mouse coordinates within document
  const { mX, mY } = { mX: mouseEvent.clientX, mY: mouseEvent.clientY };
  // element coordinates within document
  const { eX, eY } = { eX: elOffset.left, eY: elOffset.top };
  // mouse coordinates within element
  const { meX, meY } = { meX: mX - eX, meY: mY - eY };

  // create heart element, add class of 'heart' and append to target
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.top = `${meY}px`;
  heart.style.left = `${meX}px`;
  heart.innerHTML = `<i class="fas fa-heart"></i>`;
  target.appendChild(heart);
  // set timeouts to pop, and remove heart
  setTimeout(() => heart.classList.add('pop'), 0);
  setTimeout(() => heart.remove(), 1000);
}

const registerLikesCount = generateRegisterLikesCount(likes);

addDoubleClickEventListener(image, event => {
  registerLikesCount();
  heartElement(event, image);
});
