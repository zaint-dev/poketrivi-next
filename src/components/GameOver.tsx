'use client'
import { useGame } from "@/store/useGame"
import { get } from "http"

export function GameOver() {
  const { startGame, score, gameOver, setLoading, getPokemonOptions } = useGame()

  const onStartNewGame = async () => {
    setLoading(true)
    startGame()
    await getPokemonOptions()
    setLoading(false)
  }

  if (!gameOver) return null
  return (
    <div className='flex flex-col items-center justify-center text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-pink-500'>
      <p className='text-4xl font-semibold text-center'>Tus vidas se han agotado!</p>
      <p className='text-2xl font-semibold text-center'>Tu puntaje fue de: <b>{score}</b></p>
      <button className='bg-white w-[200px] p-4 text-2xl text-slate-900 rounded-lg shadow-lg font-bold mt-4' onClick={onStartNewGame}>Volver a jugar</button>
    </div>
  )
}