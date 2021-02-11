const addButton = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
  notes.forEach(note => addNewNote(note));
}

addButton.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
  <div class="tools">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>
  <div class="main ${text ? '' : 'hidden'}"></div>
  <textarea class="${text ? 'hidden' : ''}"></textarea>`;

  const editButton = note.querySelector('.edit');
  const delButton = note.querySelector('.delete');
  const mainContent = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text;
  mainContent.innerHTML = marked(text);

  delButton.addEventListener('click', () => {
    note.remove();
    updateLocalStorage();
  });

  editButton.addEventListener('click', () => {
    mainContent.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', event => {
    const { value } = event.target;

    mainContent.innerHTML = marked(value);

    updateLocalStorage();
  });

  document.body.append(note);
}

function updateLocalStorage() {
  const allTextAreas = document.querySelectorAll('textarea');

  const notes = [];

  allTextAreas.forEach(textArea => notes.push(textArea.value));

  localStorage.setItem('notes', JSON.stringify(notes));
}
