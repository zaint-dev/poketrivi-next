import { Pokemon } from "@/types/pokemon";
import { pokemonApi } from "@/api/PokeApi";

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemons = (): number[] => {
    const pokemonsArr = Array.from(Array(650));
    return pokemonsArr.map((_, index) => index + 1);
}

const getPokemonNames = async (pokemons: number[]): Promise<Pokemon[]> => {
    const [a, b, c, d] = pokemons;

    const promiseArr = [
        pokemonApi.get(`${POKEMON_API}${a}`),
        pokemonApi.get(`${POKEMON_API}${b}`),
        pokemonApi.get(`${POKEMON_API}${c}`),
        pokemonApi.get(`${POKEMON_API}${d}`),
    ]

    const [poke1, poke2, poke3, poke4] = await Promise.all(promiseArr)

    return [
        { name: poke1.data.name, id: poke1.data.id },
        { name: poke2.data.name, id: poke2.data.id },
        { name: poke3.data.name, id: poke3.data.id },
        { name: poke4.data.name, id: poke4.data.id },
    ]
}

export const getPokemonOptions = async () => {
    const pokemonsNumbers = getPokemons().sort(() => Math.random() - 0.5);
    const pokemons = await getPokemonNames(pokemonsNumbers.splice(0, 4));
    return pokemons; 
}