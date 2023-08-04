'use client'
import { useGame } from "@/store/useGame"
import JSConfetti from 'js-confetti'
import Image from 'next/image'
import { Suspense } from 'react'

export function PokemonOptions() {
  const {
    setLoading,
    pokemonsOptions,
    pokemonSelected,
    selectCorrectAnswer,
    selectWrongAnswer,
    nextPokemon,
    showPokemon,
    gameOver
  } = useGame()

  const jsConfetti = new JSConfetti()

  const onNextPokemon = async () => {
    setLoading(true)
    await nextPokemon()
    setLoading(false)
  }

  const onSelectPokemon = (pokemon: any) => {
    if (pokemon.id === pokemonSelected?.id) {
      jsConfetti.addConfetti({
        emojis: ['🌈', '✨', '🌸'],
        confettiRadius: 6,
      })
      selectCorrectAnswer()
    } else {
      selectWrongAnswer()
    }
  }

  if (showPokemon) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonSelected?.id}.svg`}
          alt="Pokemon" className='w-[200px] h-[200px] mx-auto' width={200} height={200} />
        <p className='text-2xl font-semibold text-center'>Es un <b>{pokemonSelected?.name}</b></p>
        {!gameOver && (
          <button className='bg-white w-[200px] p-4 text-2xl text-slate-900 rounded-lg shadow-lg font-bold mt-4' onClick={onNextPokemon}>Siguiente</button>
        )}
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <Suspense fallback={<div>Loading...</div>}>
          <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonSelected?.id}.svg`}
            alt="Pokemon" className='w-[200px] h-[200px] mx-auto brightness-0' width={200} height={200} />
        </Suspense>
      </div>
      {
        pokemonsOptions.map((pokemon: any) => (
          <div className='flex flex-col items-center justify-center' key={pokemon.id}>
            <button className='bg-white w-[200px] p-2 text-2xl text-slate-900 rounded-lg shadow-lg font-bold mt-4'
              onClick={() => onSelectPokemon(pokemon)}>
              {pokemon.name}
            </button>
          </div>
        ))
      }
    </>
  )
}