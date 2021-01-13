const good = document.getElementById('good');
const cheap = document.getElementById('cheap');
const fast = document.getElementById('fast');

good.addEventListener('change', () => {
  if (good.checked && cheap.checked && fast.checked) {
    cheap.checked = false;
  }
});

cheap.addEventListener('change', () => {
  if (good.checked && cheap.checked && fast.checked) {
    good.checked = false;
  }
});

fast.addEventListener('change', () => {
  if (good.checked && cheap.checked && fast.checked) {
    cheap.checked = false;
  }
});
