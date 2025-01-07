import Navbar from "@/components/Navbar"
import { Eczar } from 'next/font/google'
import BouncingCats from "@/components/BouncingCats"

const eczar = Eczar({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFBE8] overflow-hidden">
      <Navbar />
      <BouncingCats />
      <main className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] -mt-16">
        <div className="w-full max-w-2xl bg-transparent rounded-[25px] p-8 shadow-sm border border-black/50">
          <h1 className={`text-5xl text-center mb-6 text-[#2D2D2D] font-semibold ${eczar.className}`}>
            polypal
          </h1>
          <p className="text-lg leading-relaxed text-[#2D2D2D]">
            Welcome to Chat-a-Penguin! 🐧✨ Your coolest language-learning companion where chatting with an AI penguin makes picking up new languages fun and engaging.
            <br /><br />
            <strong>Interactive Learning:</strong> Practice real conversations with an AI that adapts to your language level and keeps things fresh.
            <br /><br />
            <strong>Multilingual Mastery:</strong> From Spanish to Japanese, explore a variety of languages while being gently corrected and guided.
            <br /><br />
            <strong>Penguin Personality:</strong> Enjoy witty, frosty humor that makes every chat a delight.
            <br /><br />
            So grab your virtual scarf and dive in—because learning is always cooler with a penguin by your side! 🧊❄️
          </p>
        </div>
      </main>
    </div>
  )
}

