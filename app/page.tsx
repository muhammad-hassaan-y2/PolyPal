'use client'
import Link from "next/link"
import Navbar from "@/components/Navbar"
import catWaveAnimation from "@/public/catWave.json"
import { useEffect, useRef, useState } from "react"
import { Eczar, Work_Sans } from 'next/font/google'
import dynamic from 'next/dynamic'

// Dynamically import lottie-react to avoid document is not defined
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const eczar = Eczar({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function WelcomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // instead of fetching maybe theres a quicker way?
  useEffect(() => {
    const fetchUser = async () => {
        const response = await fetch(`/api/get-session`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.userId) {
            setLoggedIn(true);
        }
    };
    fetchUser();
}, []);

  useEffect(() => {
    // Play meow sound when component mounts
    const audio = new Audio('/catMeow.wav')
    audio.volume = 0.4 // Set volume to 50%
    
    // Always play on the home page ('/')
    if (window.location.pathname === '/') {
      const playSound = async () => {
        try {
          await audio.play()
        } catch (error) {
          console.log('Audio playback failed:', error)
        }
      }
      playSound()
    }

    if (lottieRef.current) {
      const anim = lottieRef.current;
      
      // Function to handle animation complete
      const handleComplete = () => {
        // Only reverse if we just finished playing forward
        if (anim.playDirection === 1) {
          // Wait a moment at the peak of the wave
          setTimeout(() => {
            anim.setDirection(-1); // Set to reverse
            anim.play();
          }, 1000); // Wait 1 second before reversing
        }
      };

      // Add event listener using Lottie's method
      anim.onComplete = handleComplete;

      // Cleanup
      return () => {
        anim.onComplete = undefined;
      };
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBE8]">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <h1 className={`text-7xl mb-4 text-[#2D2D2D] font-semibold ${eczar.className}`}>
          polypal
        </h1>
        
        <div className="w-48 h-48 relative mb-8">
          <Lottie 
            lottieRef={lottieRef}
            animationData={catWaveAnimation}
            loop={false}
            className="w-full h-full"
            onMouseEnter={() => {
            if (lottieRef.current) {
                lottieRef.current.setDirection(1);
                lottieRef.current.play();
              }
            }}
            onMouseLeave={() => {
              if (lottieRef.current) {
                lottieRef.current.setDirection(-1);
                lottieRef.current.play();
              }
            }}
          />
        </div>

        <p className={`text-xl font-bold text-center ${workSans.className} mb-6`}>
          Yes, a cat will teach you languages
        </p>

        <div className={`flex flex-col gap-4 items-center ${workSans.className}`}>
            {loggedIn ? (
              <Link 
                href="/languages"
                className="px-8 py-3 bg-[#FF9000] text-white rounded-full font-medium text-3xl hover:bg-[#FF9000]/90 transition-colors"
              >
                Play Now!
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Link 
                  href="/languages"
                  className="px-8 py-3 bg-[#FF9000] text-white rounded-full font-medium text-3xl hover:bg-[#FF9000]/90 transition-colors"
                >
                  Start playing for free!
                </Link>
                
                <Link 
                  href="/login"
                  className="text-[#FF9000] hover:underline text-2xl"
                >
                  I already have an account
                </Link>
              </div>
            )}
            
        </div>
      </main>
    </div>
  )
}