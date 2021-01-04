const tagsDiv = document.getElementById('tags');
const textarea = document.getElementById('textarea');
const interval = document.getElementById('interval');
const times = document.getElementById('times');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value);

  if (e.key === 'Enter') {
    clearTextArea(e);
    randomizeEntry();
  }
});

function createTags(input) {
  const tags = input
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');

  tagsDiv.innerHTML = '';

  tags.forEach((tag) => {
    const tagSpan = document.createElement('span');
    tagSpan.classList.add('tag');
    tagSpan.innerText = tag;
    tagsDiv.appendChild(tagSpan);
  });
}

function clearTextArea(e) {
  setTimeout(() => {
    e.target.value = '';
  }, 10);
}

function randomizeEntry() {
  let randomTag = tagsDiv.firstChild;

  const tIntId = setInterval(() => {
    dehighlightTag(randomTag);
    randomTag = getRandomTag();
    highlightTag(randomTag);
  }, interval.value);

  setTimeout(() => {
    clearInterval(tIntId);
    highlightTag(randomTag);
  }, times.value * interval.value);
}

function getRandomTag() {
  return tagsDiv.childNodes[
    Math.floor(Math.random() * tagsDiv.childNodes.length)
  ];
}

function highlightTag(tag) {
  tag.classList.add('highlight');
}

function dehighlightTag(tag) {
  tag.classList.remove('highlight');
}
