"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { BookOpen } from 'lucide-react'
import AuthModal from './AuthModal'

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground text-transparent bg-clip-text">StoryQuest Kids</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link href="/shopPage" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="#stories" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Stories
            </Link>
            <Button onClick={() => setIsAuthModalOpen(true)} variant="default">
              Login / Sign Up
            </Button>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  )
}

