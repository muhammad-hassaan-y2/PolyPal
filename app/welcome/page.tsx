import Link from "next/link"
import Image from "next/image"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#FFFBE8]">
      <nav className="p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link 
            href="/welcome" 
            className="px-4 py-2 bg-[#FF9000] text-white rounded-full font-medium"
          >
            Home
          </Link>
          <Link 
            href="/languages" 
            className="px-4 py-2 text-[#FF9000] hover:underline font-medium"
          >
            Languages
          </Link>
          <Link 
            href="/levels" 
            className="px-4 py-2 text-[#FF9000] hover:underline font-medium"
          >
            Levels
          </Link>
          <Link 
            href="/about" 
            className="px-4 py-2 text-[#FF9000] hover:underline font-medium"
          >
            About
          </Link>
          <Link 
            href="/store" 
            className="px-4 py-2 text-[#FF9000] hover:underline font-medium"
          >
            Store
          </Link>
        </div>
        <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] -mt-16">
        <h1 className="font-eczar text-5xl mb-8 text-[#2D2D2D]">
          polypal
        </h1>
        
        <div className="w-32 h-32 relative mb-8">
          <Image
            src="/placeholder.svg"
            alt="PolyPal Mascot"
            width={128}
            height={128}
            className="rounded-full bg-[#FF9000]"
          />
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Link 
            href="/start"
            className="px-8 py-3 bg-[#FF9000] text-white rounded-full font-medium text-lg hover:bg-[#FF9000]/90 transition-colors"
          >
            Start playing for free!
          </Link>
          
          <Link 
            href="/login"
            className="text-[#FF9000] hover:underline"
          >
            I already have an account
          </Link>
        </div>
      </main>
    </div>
  )
}

