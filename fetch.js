// Fetch
//
// POST

const BASE_URL = 'https://pokeapi.co/api/v2/';

// Fetch no async
/*
fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())
    .then(data => console.log(data));
*/
// fetch async

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

// Función para buscar un Pokémon por su nombre
const fetchPokemonByName = async (pokemonName) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemonName}`);
        if (response.ok) {
            const parsedResponse = await response.json();
            return parsedResponse;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

// Obtener pokemon por nombre
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemonByName(text);
        if (pokemon) {
            const pokemonInfo = {
                name: pokemon.name,
                id: pokemon.id,
                weight: pokemon.weight,
                types: pokemon.types.map(type => type.type.name),
                abilities: pokemon.abilities.map(ability => ability.ability.name),
            };
            localStorage.setItem('currentPokeInfo', JSON.stringify(pokemonInfo));
            updatePokemonCard(pokemonInfo);
        } else {
            console.log(`No se encontró ningún Pokémon con el nombre ${text}.`);
        }
    })

document.addEventListener('DOMContentLoaded', async () => {
    const storedInfo = localStorage.getItem('currentPokeInfo');
    if (storedInfo) {
        const pokemonInfo = JSON.parse(storedInfo);
        updatePokemonCard(pokemonInfo);
    }
})

// obtener el anterior
//
//
// obtener el siguiente

document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeInfo = JSON.parse(localStorage.getItem('currentPokeInfo'));
        const newId = Math.max(1, currentPokeInfo.id - 1);
        const pokemon = await fetchPokemon(newId);
        const pokemonInfo = {
            name: pokemon.name,
            id: pokemon.id,
            weight: pokemon.weight,
            types: pokemon.types.map(type => type.type.name),
            abilities: pokemon.abilities.map(ability => ability.ability.name),
        };
        localStorage.setItem('currentPokeInfo', JSON.stringify(pokemonInfo));
        updatePokemonCard(pokemonInfo);
    })

document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeInfo = JSON.parse(localStorage.getItem('currentPokeInfo'));
        const newId = currentPokeInfo.id + 1;
        const pokemon = await fetchPokemon(newId);
        const pokemonInfo = {
            name: pokemon.name,
            id: pokemon.id,
            weight: pokemon.weight,
            types: pokemon.types.map(type => type.type.name),
            abilities: pokemon.abilities.map(ability => ability.ability.name),
        };
        localStorage.setItem('currentPokeInfo', JSON.stringify(pokemonInfo));
        updatePokemonCard(pokemonInfo);
    })

// Función para actualizar la tarjeta del Pokémon en el DOM
function updatePokemonCard(pokemonInfo) {
    const cardContainer = document.querySelector('.card--container');

    // Mapeamos los tipos de Pokémon a las clases de estilo correspondientes
    const typeClasses = pokemonInfo.types.map(type => getCssClassForType(type)).join(' ');

    // Actualizamos el HTML con las clases de tipo asignadas dinámicamente
    cardContainer.innerHTML = `
        <div class='pokemon-card ${typeClasses}'>
            <h2>${pokemonInfo.name}</h2>
            <p>ID: ${pokemonInfo.id}</p>
            ${pokemonInfo.types ? `<p>Tipo: ${mapTypesToSpanish(pokemonInfo.types).join(', ')}</p>` : ''}
            ${pokemonInfo.weight ? `<p>Peso: ${pokemonInfo.weight / 10} kg</p>` : ''}
            ${pokemonInfo.abilities ? `<p>Habilidades: ${mapAbilitiesToSpanish(pokemonInfo.abilities).join(', ')}</p>` : ''}
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInfo.id}.png' alt='${pokemonInfo.name}'>
        </div>
    `;
}




function getCssClassForType(type) {
    const typeClasses = {
        "Fuego": "fuego-type",
        "water": "agua-type",
        "grass": "grass-type",
        "electric": "electric-type",
        "psychic": "psychic-type",
        "rock": "rock-type",
        "ground": "ground-type",
        "ice": "ice-type",
        "fighting": "fighting-type",
        "poison": "poison-type",
        "flying": "flying-type",
        "bug": "bug-type",
        "ghost": "ghost-type",
        "steel": "steel-type",
        "dragon": "dragon-type",
        "dark": "dark-type",
        "fairy": "fairy-type",
        // Agrega más traducciones de tipos según sea necesario
    };
    return typeClasses[type] || '';
}


function mapTypesToSpanish(types) {
    const typesMap = {
        "fire": "Fuego",
        "water": "Agua",
        "grass": "Planta",
        "electric": "Eléctrico",
        "psychic": "Psíquico",
        "rock": "Roca",
        "ground": "Tierra",
        "ice": "Hielo",
        "fighting": "Lucha",
        "poison": "Veneno",
        "flying": "Volador",
        "bug": "Bicho",
        "ghost": "Fantasma",
        "steel": "Acero",
        "dragon": "Dragón",
        "dark": "Siniestro",
        "fairy": "Hada",
        // Agrega más traducciones de tipos según sea necesario
    };
    return types.map(type => typesMap[type] || type);
}

function mapAbilitiesToSpanish(abilities) {
    const abilitiesMap = {
        "blaze": "Llamarada",
        "solar-power": "Poder Solar",
        "speed-boost": "Impulso",
        // Agrega más traducciones de habilidades según sea necesario
    };
    return abilities.map(ability => abilitiesMap[ability] || ability);
}
