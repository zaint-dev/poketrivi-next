import { Game } from "@/components/Game";

export default function Home() {
  return (
    <main className='flex flex-col mx-auto w-2/5 h-[calc(100vh-300px)]'>
      <Game />
    </main>
  )
}
