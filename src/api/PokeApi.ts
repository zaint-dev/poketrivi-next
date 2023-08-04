import axios from 'axios';

export const pokemonApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
});

export const imageApi = axios.create({
    baseURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'
});

export default pokemonApi;