import { Countdown } from './components/Countdown'
import FrameGrid from './components/FrameGrid'
import WoodenShelf from './components/WoodenShelf'
import { BIRTHDAY_TARGET } from './constants'

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5eedf]">
      {/* <HeroBackground /> */}

      <div className="relative z-10 flex flex-col">
        <section className="flex flex-col flex-1 items-center justify-center">
          <h1
            className="font-sans text-[27cqi] leading-[1] uppercase text-gallery-900 animate-fade-up-delay-2 font-bold"
            aria-label="Louisa"
          >
            LOUISA
          </h1>
          <div className="animate-fade-up-delay-2 mt-[-16px] flex w-full items-center justify-between px-1 md:mt-[-32px] wide:mt-[-50px]">
            <h2 className="text-left">Birthday</h2>
            <h2 className="text-right">11-06-2026</h2>
          </div>
        </section>
        <section className="flex flex-1 items-center justify-center">
          <FrameGrid />
        </section>

        <section className="flex flex-1 items-center justify-center pb-4 md:pb-8">
          <WoodenShelf />
        </section>

        <section className="flex flex-col items-center pb-6 md:pb-10">
          <div className="animate-fade-up-delay-7 mb-8 h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-gallery-800/15 to-transparent" />
          <Countdown targetDate={BIRTHDAY_TARGET} />
        </section>

        <section className="flex flex-1 items-center justify-center pb-4 md:pb-8 px-2">
          <p className="text-center text-[0.6rem]"><span className="text-[0.8rem]">Joyeux anniveraire {'<3'}</span><br />{`mdr y'a qqn qui a dit que le site etait mieux décoré que mon appart MDR MDR`}</p>
        </section>
      </div>
    </main>
  )
}

export default App
