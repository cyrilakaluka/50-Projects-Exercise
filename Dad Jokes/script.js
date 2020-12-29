const jokeDiv = document.getElementById('joke');
const jokeButton = document.getElementById('joke-button');

jokeButton.addEventListener('click', generateJoke);

generateJoke();

async function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };

  let response = await fetch('https://icanhazdadjoke.com', config);
  let data = await response.json();
  jokeDiv.innerText = data.joke;
}
