const background = document.getElementById('background');
const passwordEl = document.getElementById('password');

const MINIMUM_PASSWORD_LENGTH = 10;
const DEFAULT_BG_BLUR = 20;

// Set background blur to default
background.style.filter = `blur(${DEFAULT_BG_BLUR})px`;

passwordEl.addEventListener('input', () => {
  const password = passwordEl.value;
  const blur = DEFAULT_BG_BLUR * (1 - password.length / MINIMUM_PASSWORD_LENGTH);
  background.style.filter = `blur(${blur}px)`;
});
