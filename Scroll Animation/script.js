const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', checkBoxes);

checkBoxes();

function checkBoxes() {
  let animTriggerPoint = window.innerHeight * 0.8;

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < animTriggerPoint) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}
