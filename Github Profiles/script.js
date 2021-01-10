const API_URL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username) {
  try {
    const { data } = await axios.get(API_URL + username);
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status === 404) {
      createErrorCard('No profile found with this user name');
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios.get(API_URL + username + '/repos?sort=created');
    addReposToCard(data);
  } catch (err) {
    console.log(err);
    createErrorCard('Problem fetching repos');
  }
}

function createUserCard(user) {
  const cardHTML = `<div class="card user">
        <div class="user__avatar">
          <img src="${user.avatar_url}" alt="${user.name}" class="user__photo" />
        </div>
        <div class="user__info">
          <h2 class="user__name">${user.name}</h2>
          <p class="user__bio">${user.bio}</p>
          <ul class="user__statistics">
            <li class="user__statistic">${user.followers} <strong class="user__statistic-name">Followers</strong></li>
            <li class="user__statistic">${user.following} <strong class="user__statistic-name">Following</strong></li>
            <li class="user__statistic">${user.public_repos} <strong class="user__statistic-name">Repos</strong></li>
          </ul>
          <div id="repos" class="user__repos">
          </div>
        </div>
      </div>`;

  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardHTML = `
    <div class="card user">
    <h1>${msg}</h1>
    </div>
  `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');

  repos.slice(0, 10).forEach(repo => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('user__repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = '';
  }
});
