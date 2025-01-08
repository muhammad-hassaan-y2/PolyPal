'use client'
import Link from "next/link"
import Navbar from "@/components/Navbar"
import catWaveAnimation from "@/public/catWave.json"
import { useEffect, useRef } from "react"
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

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBE8]">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] -mt-16">
        <h1 className={`text-5xl mb-4 text-[#2D2D2D] font-semibold ${eczar.className}`}>
          polypal
        </h1>
        
        <div className="w-32 h-32 relative mb-8">
          <Lottie 
            lottieRef={lottieRef}
            animationData={catWaveAnimation}
            loop={false}
            className="w-full h-full"
          />
        </div>

        <div className={`flex flex-col gap-4 items-center ${workSans.className}`}>
          <Link 
            href="/lessonPage"
            className="px-8 py-3 bg-[#FF9000] text-white rounded-full font-medium text-lg hover:bg-[#FF9000]/90 transition-colors"
          >
            start playing for free!
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