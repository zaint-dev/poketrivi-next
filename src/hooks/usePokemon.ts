import { Pokemon } from "@/types/pokemon";
import { useState } from "react";
import { getPokemonOptions } from '@/utils/getPokemons'

export function usePokemons() {
    const [pokemonsOptions, setPokemonsOptions] = useState<Pokemon[] | [] >([]);
    const [pokemonSelected, setPokemonSelected] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getPokemons = async (): Promise<void> => {
        setLoading(true);
        const pokemons = await getPokemonOptions();
        setPokemonSelected(pokemons[Math.floor(Math.random() * pokemons.length)]);
        setPokemonsOptions(pokemons);
        setLoading(false);
    }

    return {
        pokemonsOptions,
        pokemonSelected,
        getPokemons,
        loading
    }
}