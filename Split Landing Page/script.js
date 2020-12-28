const container = document.querySelector('.container');
const splitLeft = document.querySelector('.split--left');
const splitRight = document.querySelector('.split--right');

splitLeft.addEventListener('mouseover', () =>
  container.classList.add('hover-left')
);

splitLeft.addEventListener('mouseout', () =>
  container.classList.remove('hover-left')
);

splitRight.addEventListener('mouseover', () =>
  container.classList.add('hover-right')
);

splitRight.addEventListener('mouseout', () =>
  container.classList.remove('hover-right')
);
