/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Work_Sans } from 'next/font/google'
import { UserNav } from './user-nav'
import { useEffect, useState } from 'react'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const fetchPoints = async () => {
  const response = await fetch('/api/db/userProgress/points', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  return result.points
}

export default function Navbar({ passedPoints = -1, setPassedPoints = (num: number) => { } }) {
  const [localPoints, setLocalPoints] = useState(0)
  const pathname = usePathname()
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Play', path: '/languages' },
    // { name: 'Levels', path: '/levels' },
    { name: 'About', path: '/about' },
    { name: 'Store', path: '/shopPage' },
  ]

  useEffect(() => {
    try {
      async function getPoints() {
        const fetchedPoints = await fetchPoints();
        setPassedPoints(fetchedPoints)
        setLocalPoints(fetchedPoints)
      }
      getPoints();

    } catch (error) {
      console.error('Error:', error)
    }

  }, [setPassedPoints])

  return (
    <nav
      className={`p-4 flex justify-between items-center bg-[#FFFBE8] font-semibold ${workSans.className} relative z-50`}
    >
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`px-4 py-2 font-bold hover:scale-110 transition-transform ${pathname === item.path
              ? 'bg-[#FF9000] text-white rounded-full'
              : 'text-[#594F43]'
              }`}
          >
            {item.name}
          </Link>
        ))}
        <span
          className="px-4 py-2 font-bold hover:scale-110 transition-transform text-black justify-left">
          Points: {(passedPoints == -1) ? localPoints : passedPoints}
        </span>
      </div>
      <div className="flex items-center">
        <UserNav />
      </div>
    </nav>
  )
}

