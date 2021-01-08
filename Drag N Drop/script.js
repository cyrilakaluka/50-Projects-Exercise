const dropBoxes = document.querySelectorAll('.drop-box');
const draggables = document.querySelectorAll('[draggable="true"]');

draggables.forEach((draggable) => {
  draggable.addEventListener('dragstart', dragStart);
  draggable.addEventListener('dragend', dragEnd);
});

dropBoxes.forEach((dropBox) => {
  dropBox.addEventListener('dragover', dragOver);
  dropBox.addEventListener('dragenter', dragEnter);
  dropBox.addEventListener('dragleave', dragLeave);
  dropBox.addEventListener('drop', dragDrop);
});

function dragStart(e) {
  this.classList.add('on-drag-hold');
  e.dataTransfer.setData('Text', e.target.className);
}

function dragEnd() {
  this.classList.remove('on-drag-hold');
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('drag-enter');
}

function dragLeave() {
  this.classList.remove('drag-enter');
}

function dragDrop(e) {
  e.preventDefault();
  let data = e.dataTransfer.getData('Text')?.trim();

  if (data && data !== '') {
    this.appendChild(document.querySelector('.on-drag-hold'));
  }
  this.classList.remove('drag-enter');
}
