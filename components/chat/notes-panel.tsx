import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface NotesPanelProps {
  isOpen: boolean
  onToggle: () => void
}

export function NotesPanel({ isOpen, onToggle }: NotesPanelProps) {
  return (
    <div className={`w-80 bg-pink-50 border-l border-pink-200 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-pink-900">Notes</h3>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggle}
            className="text-pink-700 hover:text-pink-800 hover:bg-pink-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-pink-700">
          This is some notes. The user&apos;s notes associated with this lesson. This is some notes.
          The user&apos;s notes associated with this lesson. This is some notes.
          The user&apos;s notes associated with this lesson.
        </p>
      </div>
    </div>
  )
}

