import { create } from 'zustand'
import { Pokemon } from '@/types/pokemon'
import { getPokemonOptions } from '@/utils/getPokemons';
import { stat } from 'fs';

export interface GameStore {
    pokemonsOptions: Pokemon[];
    pokemonSelected: Pokemon | null;
    started: boolean;
    showPokemon: boolean;
    score: number;
    lives: number;
    level: number;
    time: number;
    gameOver: boolean;
    consecutiveCorrectAnswers: number;
    loading: boolean;
    getPokemonOptions: () => Promise<void>;
    startGame: () => void;
    selectCorrectAnswer: () => void;
    selectWrongAnswer: () => void;
    nextPokemon: () => Promise<void>;
    resetGame: () => void;
    setLoading: (loading: boolean) => void;
}

export const useGame = create<GameStore>((set, get) => ({
    pokemonsOptions: [] as Pokemon[],
    pokemonSelected: null,
    started: false,
    showPokemon: false,
    score: 0,
    lives: 3,
    level: 1,
    time: 0,
    gameOver: false,
    consecutiveCorrectAnswers: 0,
    loading: false,
    getPokemonOptions: async () => {
        const pokemons = await getPokemonOptions();
        const pokemonSelected = pokemons[Math.floor(Math.random() * pokemons.length)];
        set({ pokemonsOptions: pokemons, pokemonSelected });
    },
    startGame: () => (set(state => {
        return {
            started: true,
            showPokemon: false,
            score: 0,
            lives: 3,
            level: 1,
            time: 0,
            gameOver: false,
            consecutiveCorrectAnswers: 0,
        }
    })),
    selectCorrectAnswer: () => set(state => {
        if (state.consecutiveCorrectAnswers === 5) {
            return {
                score: state.score + 10,
                consecutiveCorrectAnswers: 0,
                level: state.level + 1,
                showPokemon: true
            }
        }
        return {
            score: state.score + 10,
            level: state.level + 1,
            consecutiveCorrectAnswers: state.consecutiveCorrectAnswers + 1,
            showPokemon: true
        }
    }),
    selectWrongAnswer: () => set(state => {
        if (state.lives === 1) {
            return {
                lives: state.lives - 1,
                gameOver: true,
                showPokemon: true,
                consecutiveCorrectAnswers: 0
            }
        }
        return {
            lives: state.lives - 1,
            showPokemon: true,
            consecutiveCorrectAnswers: 0
        }
    }),
    nextPokemon: async () => {
        const pokemones = await getPokemonOptions();
        const pokemonSelected = pokemones[Math.floor(Math.random() * pokemones.length)];
        set({
            pokemonsOptions: pokemones,
            showPokemon: false,
            pokemonSelected
        })
    },
    resetGame: () => set(state => {
        return {
            started: false,
            showPokemon: false,
            score: 0,
            lives: 3,
            level: 1,
            time: 0,
            gameOver: false,
            consecutiveCorrectAnswers: 0
        }
    }),
    setLoading: (loading: boolean) => set({ loading })
}))