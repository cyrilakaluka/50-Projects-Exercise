const pokemons = document.getElementById('pokemons');

const POKEMON_API = `https://pokeapi.co/api/v2/pokemon/`;
const POKEMONS_TO_FETCH = 150;

const typeBGColors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#F4E7DA',
  rock: '#D5D5D4',
  fairy: '#98D7A5',
  poison: '#98D7A5',
  bug: '#F8D5A3',
  dragon: '#97B3E6',
  psychic: '#EAEDA1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

async function fetchPokemons() {
  for (let i = 1; i <= POKEMONS_TO_FETCH; i++) {
    const pokeData = await fetchPokemon(i);
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon');
    if (pokeData.type) {
      pokemon.style.backgroundColor = typeBGColors[pokeData.type];
    }

    pokemon.innerHTML = getPokemonMarkup(pokeData);
    pokemons.append(pokemon);
  }
}

async function fetchPokemon(id) {
  const url = POKEMON_API + id;
  const result = await fetch(url);
  const data = await result.json();
  return { id: data.id, name: data.name, type: getPokemonType(data.types) };
}

function getPokemonType(types) {
  const primaryTypes = Object.keys(typeBGColors);
  const typeNames = types.map(type => type.type.name);
  let output = primaryTypes.find(type => typeNames.indexOf(type) > -1);
  if (!output) output = '';
  return output;
}

function getPokemonMarkup({ id, name, type }) {
  const addLeadingZeros = (num, size) => {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  };

  return `
  <div class="image-frame">
    <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="Pokemon" class="image" />
  </div>
  <div class="info">
    <div class="id">#${addLeadingZeros(id, 3)}</div>
    <div class="name">${name.replace(/^./, name[0].toUpperCase())}</div>
    <div class="type">${type}</div>
  </div>`;
}

fetchPokemons().then(() => console.log('Fetch Complete'));
