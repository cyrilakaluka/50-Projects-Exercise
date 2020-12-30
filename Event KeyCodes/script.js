const insert = document.getElementById('insert');
const clear = document.getElementById('clear');

window.addEventListener('keydown', (event) => {
  insert.innerHTML = `
  <div class="key">
    ${event.key === ' ' ? 'Space' : event.key}
    <small>event.key</small>
  </div>
  <div class="key">
    ${event.keyCode}
    <small>event.KeyCode</small>
  </div>
  <div class="key">
    ${event.code}
    <small>event.code</small>
  </div>`;
});

clear.addEventListener('click', () => {
  insert.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      child.firstChild.textContent = '\u2014';
    }
  });
});
