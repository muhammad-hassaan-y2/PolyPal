import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">About Us</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="#" className="text-gray-300 hover:text-white">Our Story</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Team</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="#" className="text-gray-300 hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Parents Guide</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Educational Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="#" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="#" className="text-gray-300 hover:text-white">Facebook</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Twitter</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Instagram</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-blue-800 pt-8 flex justify-between">
          <p className="text-gray-400 text-sm">&copy; 2023 StoryQuest Kids. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Inspiring young minds through interactive storytelling</p>
        </div>
      </div>
    </footer>
  )
}

