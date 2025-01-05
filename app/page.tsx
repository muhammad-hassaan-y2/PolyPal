import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFFBE8" }}>
      <main className="text-center">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl mb-8 text-primary">
            Welcome to Polypal
          </h1>
          <div className="mb-8">
            <div className="w-full h-64 sm:h-80 md:h-96 bg-muted rounded-lg shadow-xl overflow-hidden">
              <img 
                src="/placeholder.svg?height=384&width=640" 
                alt="Polypal animated logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-xl mb-8 text-muted-foreground">
            Discover a world of interactive learning and fun with Polypal!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-lg">
                Start playing for free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg">
                Have an account
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

