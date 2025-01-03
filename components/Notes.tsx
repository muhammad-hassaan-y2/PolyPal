'use client'

import { useState, useEffect} from 'react'
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface NotesProps {
    user: string;
    lvl: string;
    topic: string;
  }

export default function Notes({ user, lvl, topic }: NotesProps) {
    const [isNotesOpen, setIsNotesOpen] = useState(false)
    const [noteContent, setNoteContent] = useState('')
    const [lastSaved, setLastSaved] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    //update the db 
    const saveNoteToDynamoDB = async () => {
        const currentDate = new Date()
        const response = await fetch(`/api/db/notesLevels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: "update",
                user: user,
                topic: topic,
                noteContent: noteContent,
                lvl: lvl,
                currentDate: currentDate.toISOString(),
            }),
        })
        setLastSaved(currentDate.toLocaleString())
        return response
    }

    //gets the stuff from the db to show on the notes page
    const fetchNotes = async () => {
        setIsLoading(true)
        const response = await fetch(`/api/db/notesLevels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: "fetch",
                user: user,
                topic: topic,
            }),
        })
        const data = await response.json()
        if (data.Item) {
            //get the note content if available otherwise the notes is just empty
            setNoteContent(data.Item.noteContent || '')
            if (data.Item.updatedAt) {
                setLastSaved(new Date(data.Item.updatedAt).toLocaleString())
            }
        }
        setIsLoading(false)
        return response
    }

    useEffect(() => {
        if (isNotesOpen) {
            fetchNotes()
        }
    }, [isNotesOpen])

    if (isNotesOpen) {
        return (
            <Card className="fixed right-0 top-[65px] w-[400px] h-[calc(100vh-140px)] flex flex-col shadow-lg z-50 bg-white/95 backdrop-blur-sm rounded-[15px]">
                <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Save Your Notes Here!</h2>
                <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotesOpen(false)}
                className="h-8 w-8"
                >
                <X className="h-4 w-4" />
                </Button>
                </div>
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        Loading notes...
                    </div>
                ) : (
                    <textarea
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        className="flex-1 w-full p-4 bg-transparent border-0 resize-none focus:outline-none h-[calc(100%-110px)]"
                        placeholder="Write your notes here..."
                    />
                )}

                <div className="p-4 border-t flex items-center justify-between">
                    <Button onClick={saveNoteToDynamoDB}>
                        Save Note
                    </Button>
                    {lastSaved && (
                        <span className="text-sm text-gray-500">
                            Saved on {lastSaved}
                        </span>
                    )}
                </div>
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

