'use client'

import { useEffect, useState } from 'react'
import Navbar from "@/components/Navbar"
import { useParams } from 'next/navigation'
import Notes from "@/components/Notes"
import { ChatInterface } from '@/components/chat/ChatInterface'

const fetchAI = async (topic: string) => {
    try {
        const res = await fetch(`/api/ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputText: `Please focus on ${topic} topics when teaching Chinese.`,
            }),
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.error("Error loading AI", error)
    }
}

export default function DetailedLessonPage() {
    const params = useParams()
    const topic = params?.topic as string
    const [aiOutput, setAiOutput] = useState("Waiting for your language partner")

    useEffect(() => {
        async function getAIOutput() {
            const data = await fetchAI(topic)
            if (data && data.output && data.output.message && data.output.message.content) {
                const textOutput = data.output.message.content.map((item: { text: string }) => item.text).join("\n\n")
                setAiOutput(textOutput)
            } else {
                setAiOutput("No output received from AI.")
            }
        }
        getAIOutput()
    }, [topic])

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 to-pink-200">
            <Navbar />
            <div className="flex-grow flex justify-center px-4 py-6">
                <div className="w-full max-w-4xl">
                    <ChatInterface topic={topic} />
                </div>
            </div>
            <Notes />
        </div>
    )
}

