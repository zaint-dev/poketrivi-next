export function Header() {
  return (
    <header className="flex justify-center items-center mt-8 mb-8">
      <section className="md:w-2/5 mx-auto w-4/5">
        <h1 className="text-5xl font-extrabold dark:text-white md:text-5xl lg:text-6xl">
          Bienvenido!
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"> A la PokeTrivi!</span>
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-4 text-justify">
          Pon a prueba tus conocimientos de pokemon y adivina que pokemon es el que se muestra en la imagen, tienes 4 opciones para elegir.
        </p>
      </section>
    </header>
  )
}