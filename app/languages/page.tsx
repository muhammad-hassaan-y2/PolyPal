import Navbar from "@/components/Navbar"

export default function LanguagesPage() {
  const languages = [
    "English",
    "Spanish",
    "Chinese",
    "German",
    "French",
    "Hindi",
    "Arabic"
  ]

  return (
    <div className="min-h-screen bg-[#FFFBE8]">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] -mt-16">
        <div className="w-full max-w-md bg-transparent rounded-[25px] p-8 shadow-sm border border-black/50">
          <h2 className="font-eczar text-2xl text-center mb-6 text-[#2D2D2D]">Select Language:</h2>
          <div className="space-y-3">
            {languages.map((language) => (
              <button
                key={language}
                className="w-full px-6 py-3 bg-[#FF9000] text-black border border-black rounded-[30px] font-medium text-lg hover:bg-[#FF9000]/90 transition-colors"
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

