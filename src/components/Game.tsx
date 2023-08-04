'use client'
import { useGame } from "@/store/useGame"
import { GameOver } from "./GameOver"
import { PokemonOptions } from "./PokemonOptions"
import { Loading } from "./loading"

export function Game() {
  const { setLoading, getPokemonOptions, loading, startGame, started, score, lives, level, } = useGame()

  const onStartGame = async () => {
    setLoading(true)
    await getPokemonOptions()
    startGame()
    setLoading(false)
  }

  if (!started) {
    return <button className='bg-white w-[200px] p-4 text-2xl text-slate-900 rounded-lg shadow-lg font-bold' onClick={onStartGame}>Comenzar!</button>
  }

  return (
    <div className='flex flex-col justify-start'>
      <section className='flex flex-row items-center justify-between'>
        <p className='font-semibold text-lg'>Score: <b>{score}</b></p>
        <p className='font-semibold text-lg'>Lives: <b>{lives}</b></p>
        <p className='font-semibold text-lg'>Level: <b>{level}</b></p>
      </section>
      <section className='mt-6'>
        {loading ?
          <Loading />
          :
          <PokemonOptions />
        }
        <GameOver />
      </section>
    </div>

  )
}