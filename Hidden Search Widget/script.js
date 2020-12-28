const search = document.querySelector('.search');
const searchButton = document.querySelector('.search__btn');
const searchInput = document.querySelector('.search__input');

searchButton.addEventListener('click', () => {
  search.classList.toggle('active');
  searchInput.focus();
});

searchInput.addEventListener('blur', () => {
  search.classList.remove('active');
});
