'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

export default function Notes() {
    const [isNotesOpen, setIsNotesOpen] = useState(false)
    const [noteContent, setNoteContent] = useState('')

    if (isNotesOpen) {
        return (
            <Card className="fixed right-0 top-[65px] w-[400px] h-[calc(100vh-65px)] flex flex-col shadow-lg z-50 bg-white/95 backdrop-blur-sm">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Notes</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsNotesOpen(false)}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="flex-1 w-full p-4 bg-transparent border-0 resize-none focus:outline-none"
                    placeholder="Write your notes here..."
                />
            </Card>
        )
    }

    return (
        <Button
            variant="ghost"
            className="fixed right-6 top-[75px] z-50"
            onClick={() => setIsNotesOpen(true)}
        >
            <Image 
                src="/notes.png"
                alt="Notes Icon"
                width={32}
                height={32}
                className="opacity-80 hover:opacity-100 transition-opacity"
            />
        </Button>
    )
}

