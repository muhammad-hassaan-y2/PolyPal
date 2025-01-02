import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function LevelsPage() {
  const levels = [
    "Beginner",
    "Intermediate",
    "Advanced"
  ]

  return (
    <div className="min-h-screen bg-[#FFFBE8]">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] -mt-16">
        <div className="w-full max-w-md bg-transparent rounded-[25px] p-8 shadow-sm border border-black/50">
          <h2 className="font-eczar text-2xl text-center mb-6 text-[#2D2D2D]">Select Level</h2>
          <div className="space-y-3">
            {levels.map((level) => (
              <Link
                key={level}
                href="/lessons"
                className="block w-full px-6 py-3 bg-[#FF9000] text-black border border-black rounded-[30px] font-medium text-lg hover:bg-[#FF9000]/90 transition-colors text-center"
              >
                {level}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

