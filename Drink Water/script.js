const bigCup = document.querySelector('.cup--big');
const smallCups = document.querySelectorAll('.cup--small');
const percentage = document.getElementById('percentage');
const remaining = document.getElementById('litres');

remaining.innerText = '2L';

// Array.from(smallCups)
//   .filter((cup, idx) => idx <= 6)
//   .forEach((cup) => console.log(cup));

smallCups.forEach((cup, index) => {
  cup.addEventListener('click', () => {
    highlightCups(index);
  });
});

function highlightCups(index) {
  const selectedCup = smallCups[index];

  if (
    selectedCup.classList.contains('filled') &&
    !selectedCup.nextElementSibling?.classList.contains('filled')
  ) {
    smallCups[index].classList.remove('filled');
    index--;
  } else {
    smallCups.forEach((cup, idx) => {
      if (idx <= index) {
        cup.classList.add('filled');
      } else {
        cup.classList.remove('filled');
      }
    });
  }

  updateBigCup(index);
}

function updateBigCup(index) {
  const fillPercentage = ((index + 1) / smallCups.length) * 100;
  const remainingLitres = 2 - (fillPercentage / 100) * 2;

  document.documentElement.style.setProperty(
    '--fill-height',
    `${fillPercentage}%`
  );

  if (fillPercentage > 10) {
    percentage.innerText = `${fillPercentage}%`;
    percentage.style.visibility = `visible`;
  } else {
    percentage.style.visibility = `hidden`;
  }

  if (fillPercentage <= 90) {
    remaining.innerText = `${remainingLitres}L`;
    remaining.nextElementSibling.innerText = 'Remaining';
    remaining.style.visibility = 'visible';
    remaining.nextElementSibling.style.visibility = 'visible';
  } else {
    remaining.style.visibility = 'hidden';
    remaining.nextElementSibling.style.visibility = 'hidden';
  }
}
