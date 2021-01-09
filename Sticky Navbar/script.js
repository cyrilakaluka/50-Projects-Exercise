const nav = document.getElementById('nav');

document.addEventListener('scroll', () => {
  const percentVh = (window.pageYOffset / document.body.clientHeight) * 100;
  if (percentVh > 25) {
    nav.classList.add('scroll');
  } else {
    nav.classList.remove('scroll');
  }
});
