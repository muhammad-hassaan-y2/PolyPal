import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Rocket, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-primary-foreground">
          <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Embark on Magical Adventures!
              </h1>
              <p className="mt-3 text-xl">
                Join StoryQuest Kids and explore enchanting tales filled with wonder and excitement.
              </p>
              <div className="mt-8">
                <Link href="/lessonPage">
                <Button size="lg" className="text-lg">
                  Start Your Adventure
                </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="w-full h-64 sm:h-80 md:h-96 bg-background rounded-lg shadow-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary">
                  Interactive Story Scene
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-12">
              Discover the Magic
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Interactive Stories', description: 'Engage with captivating tales where your choices shape the adventure.', icon: BookOpen },
                { title: 'Educational Fun', description: 'Learn valuable lessons while having a blast with our exciting storylines.', icon: Rocket },
                { title: 'Safe Environment', description: 'Parents can rest easy knowing their kids are in a secure, ad-free space.', icon: Shield },
              ].map((feature, index) => (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stories Section */}
        <section id="stories" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-12">
              Popular Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'The Enchanted Forest', description: 'Explore a magical world filled with talking animals and hidden treasures.' },
                { title: 'Space Explorers', description: 'Blast off into the cosmos and discover new planets and alien friends.' },
                { title: 'Pirates Treasure', description: 'Set sail on the high seas in search of legendary buried treasure.' },
              ].map((story, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="h-48 bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    Story Thumbnail
                  </div>
                  <CardHeader>
                    <CardTitle>{story.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{story.description}</p>
                    <Button variant="outline">Read Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of young explorers and dive into a world of imagination!
            </p>
            <Button size="lg" variant="secondary" className="text-lg">
              Create Your Free Account
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

