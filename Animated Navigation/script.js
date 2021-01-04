const button = document.getElementById('button');
const nav = document.getElementById('navigation');

button.addEventListener('click', () => {
  nav.classList.toggle('active');
});
