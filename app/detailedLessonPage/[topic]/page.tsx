'use client'

import { useEffect, useState } from 'react'
import Navbar from "@/components/Navbar"
import { useParams, useSearchParams } from 'next/navigation'
import Notes from "@/components/Notes"
import { ChatInterface } from '@/components/chat/ChatInterface'
import { Eczar, Work_Sans } from 'next/font/google'

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

export default function DetailedLessonPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const topicParam = params?.topic as string
    const [topic, setTopic] = useState("")
    const language = (searchParams.get('language') || 'english').charAt(0).toUpperCase() + 
                    (searchParams.get('language') || 'english').slice(1)
    const user = "user9"
    const level = "beginner"

    useEffect(() => {
        // Parse the topic from the URL parameter
        const parsedTopic = topicParam
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .trim() // Remove leading/trailing spaces
            .toLowerCase() // Convert to lowercase
            .replace(/\b\w/g, c => c.toUpperCase()) // Capitalize first letter of each word
        setTopic(parsedTopic)
    }, [topicParam])

    return (
        <div className="min-h-screen flex flex-col bg-[#FFFBE8]">
            <Navbar />
            <div className="flex-grow flex justify-center px-4 py-6">
                <div className="w-full max-w-4xl">
                    <h1 className={`text-3xl font-bold text-[#2D2D2D] mb-6 text-center ${eczar.className}}`}>
                        {topic}
                    </h1>
                    <ChatInterface topic={topic} language={language} />
                </div>
            </div>

            <Notes 
            user={user}
            lvl={level}
            topic={topic}
            language={language}
            />

        </div>
    )
}

