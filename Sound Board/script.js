const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong'];

sounds.forEach((sound) => {
  let button = document.createElement('button');
  button.classList.add('btn');
  button.innerText = sound;

  button.addEventListener('click', () => {
    sounds.forEach((sound) => {
      let currentSound = document.getElementById(sound);
      currentSound.pause();
      currentSound.currentTime = 0;
    });
    document.getElementById(sound).play();
  });
  document.getElementById('buttons').appendChild(button);
});
