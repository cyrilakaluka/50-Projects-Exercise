const close = document.getElementById('close');
const open = document.getElementById('open');
const container = document.querySelector('.container');
const circle = document.querySelector('.circle');
const menuItems = document.querySelectorAll('.menu__item');

open.addEventListener('click', () => {
  container.classList.add('show-nav');
  circle.classList.add('rotate');
  menuItems.forEach((menuItem) => {
    menuItem.classList.add('show-nav');
  });
});

close.addEventListener('click', () => {
  container.classList.remove('show-nav');
  circle.classList.remove('rotate');
  menuItems.forEach((menuItem) => {
    menuItem.classList.remove('show-nav');
  });
});
