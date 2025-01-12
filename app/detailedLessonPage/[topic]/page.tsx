'use client'

import { useEffect, useState, useRef } from 'react'
import Navbar from "@/components/Navbar"
import { useParams, useSearchParams } from 'next/navigation'
import Notes from "@/components/Notes"
import { ChatInterface } from '@/components/chat/ChatInterface'
import { Eczar } from 'next/font/google'

const eczar = Eczar({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// const workSans = Work_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   display: 'swap',
// })

// Placeholder messages
const congratMessages = [
    "🐾 Purrfect! You're pawsitively amazing—keep up the claw-some work! 😻",
    "🐈 Meow-velous job! You're making strides like a true whisker warrior. Keep going! 🐾",
    "🐾 Fur-tastic! You've earned a big stretch and a treat—don't stop now! 🐾",
    "😺 Claw-some progress! You're leaping through challenges like a pro—keep those paws moving!",
    "🐾 You're the cat's whiskers! Keep chasing those dreams like a playful kitten. 🐈",
    "🐱 Paw-some effort! You're pouncing toward your goals—don't fur-get to celebrate! 🎉",
    "🐾 Kitty-tastic! You're as sharp as a cat's claws. Keep going, you've got this! 🐾"
]

export default function DetailedLessonPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const topicParam = params?.topic as string
    const [topic, setTopic] = useState("")
    const language = (searchParams.get('language') || 'english').charAt(0).toUpperCase() + 
                    (searchParams.get('language') || 'english').slice(1)
    const [user, setUser] = useState<string | "">("");
    const level = "beginner" //i dont think we need this so if we have time we can refactor
    const [isPurring, setIsPurring] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const [notification, setNotification] = useState(false)
    const [rewardMessage, setRewardMessage] = useState("")
    const [pointsToPass, setPointsToPass] = useState(0)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/get-session`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setUser(data.userId);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        // Parse the topic from the URL parameter
        const parsedTopic = topicParam
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .trim() // Remove leading/trailing spaces
            .toLowerCase() // Convert to lowercase
            .replace(/\b\w/g, c => c.toUpperCase()) // Capitalize first letter of each word
        setTopic(parsedTopic)
    }, [topicParam])

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio('/catPurr.wav')
        audioRef.current.loop = true
        audioRef.current.volume = 0.3

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    const togglePurring = () => {
        if (!audioRef.current) return

        if (isPurring) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPurring(!isPurring)
    }
    const handleRewardNotification = (notify: boolean) => {
        // console.log("Received in parent:", notify);
        if (notify === true){
            setNotification(true);
            setRewardMessage(congratMessages[Math.floor(Math.random() * congratMessages.length)]);
            setTimeout(() => setNotification(false), 3000);
        }
    };


    return (
        <div className="min-h-screen flex flex-col bg-[#FFFBE8]">
            <Navbar passedPoints={pointsToPass} setPassedPoints={setPointsToPass} disablePoints={false}/>
            <div className="flex-grow flex justify-center px-4 py-6">
                <div className="w-full max-w-4xl">
                    <h1 className={`text-3xl font-bold text-[#2D2D2D] mb-6 text-center ${eczar.className}`}>
                        {topic}
                    </h1>
                    <div className="flex items-center justify-center mb-4 gap-2">
                        <button
                            onClick={togglePurring}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                isPurring 
                                    ? 'bg-[#FF9000]' 
                                    : 'bg-white border border-[#FF9000]'
                            }`}
                            title="Toggle Cat Purring"
                        >
                            <span className={isPurring ? 'text-white' : 'text-[#FF9000]'}>
                                🐱
                            </span>
                        </button>
                        <p className="text-sm text-gray-600">
                            <strong>Listen to Cat Purring while Studying </strong>
                        </p>
                    </div>
                    <ChatInterface 
                    topic={topic} 
                    language={language} 
                    onReward={handleRewardNotification}
                    passedPoints={pointsToPass}
                    setPassedPoints={setPointsToPass}
                    />
                </div>
            </div>

            <Notes 
                user={user}
                lvl={level}
                topic={topic}
                language={language}
            />

            {notification && (
                <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
                    <div className="bg-white/90 backdrop-blur-sm border-2 border-[#FF9000] 
                                rounded-lg p-4 shadow-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <span className="text-2xl">🌟</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#FF9000]">
                                    10 Points earned! 🎉
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {rewardMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

