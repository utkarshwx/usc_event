import React, { useState, useEffect, useCallback } from 'react'
import { ChevronDown, Calendar, MapPin, Users, Zap, Code, Globe, ChevronLeft, ChevronRight, Home } from 'lucide-react'

export default function Component() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSpeaker, setCurrentSpeaker] = useState(0)

  const speakers = [
    { name: "Dr. Master of AI", title: "AI Research Lead", image: "" },
    { name: "Expert of Blockchain", title: "Blockchain Expert", image: "" },
    { name: "Quantum placeholder", title: "Quantum Computing Specialist", image: "" },
    { name: "Gurdian Security", title: "Cybersecurity Guru", image: "" },
    { name: "Imaginative Engineer", title: "VR/AR Innovator", image: "" },
    { name: "Saviour of IoT", title: "IoT Pioneer", image: "" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newSection = Math.floor(scrollPosition / windowHeight)
      setCurrentSection(newSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeaker((prevSpeaker) => (prevSpeaker + 1) % speakers.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [speakers.length])

  const sections = [
    { title: 'Home', icon: Home },
    { title: 'About', icon: Users },
    { title: 'Schedule', icon: Calendar },
    { title: 'Speakers', icon: Zap },
    { title: 'Workshops', icon: Code },
    { title: 'Venue', icon: MapPin },
  ]

  const nextSpeaker = useCallback(() => {
    setCurrentSpeaker((prevSpeaker) => (prevSpeaker + 1) % speakers.length)
  }, [speakers.length])

  const prevSpeaker = useCallback(() => {
    setCurrentSpeaker((prevSpeaker) => (prevSpeaker - 1 + speakers.length) % speakers.length)
  }, [speakers.length])

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 bg-slate-800 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter">SprintTech</h1>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <ul className="hidden md:flex space-x-6">
            {sections.map((section, index) => (
              <li key={section.title}>
                <a
                  href={`#${section.title.toLowerCase()}`}
                  className={`flex items-center space-x-2 ${
                    currentSection === index ? 'text-orange-500' : 'text-white hover:text-orange-300'
                  } transition-colors duration-300`}
                >
                  <section.icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed top-14 left-0 right-0 bg-black shadow-lg z-40 md:hidden animate-fadeIn">
          <ul className="py-4">
            {sections.map((section, index) => (
              <li key={section.title}>
                <a
                  href={`#${section.title.toLowerCase()}`}
                  className={`flex items-center space-x-2 px-6 py-3 ${
                    currentSection === index ? 'bg-orange-500 text-white' : 'text-white hover:bg-orange-500 hover:text-white'
                  } transition-colors duration-300`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <section.icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main>
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
          <div className="text-center animate-fadeInUp">
            <h2 className="text-5xl md:text-7xl font-bold mb-16">SprintTech</h2>
            <p className="text-xl md:text-2xl mb-8 text-orange-300">Shaping the Future of Technology</p>
            <a
              href="#about"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 animate-pulse"
            >
              Learn More
            </a>
          </div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center bg-white text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center">About the Event</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fadeInLeft">
                <p className="text-lg mb-6">
                  SprintTech is a cutting-edge conference that brings together innovators, thought leaders, and
                  tech enthusiasts from around the globe. Our mission is to explore the latest trends and breakthroughs
                  in technology that will shape our future.
                </p>
                <p className="text-lg">
                  Join us for three days of inspiring keynotes, interactive workshops, and unparalleled networking
                  opportunities. Whether you're a seasoned professional or a curious newcomer, SprintTech offers
                  something for everyone passionate about the future of tech.
                </p>
              </div>
              <div className="relative animate-fadeInRight">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 transform skew-y-6 rounded-3xl shadow-lg"></div>
                <img
                  src='../assets/event.jpg'
                  alt="Tech Conference"
                  className="relative z-10 rounded-3xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="schedule" className="min-h-screen flex items-center justify-center bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Event Schedule</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {['Day 1', 'Day 2', 'Day 3'].map((day, index) => (
                <div key={day} className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-md animate-fadeInUp" style={{animationDelay: `${index * 0.2}s`}}>
                  <h3 className="text-2xl font-bold mb-4 text-orange-500">{day}</h3>
                  <ul className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-16 text-orange-400 font-semibold">
                          {9 + item}:00 AM
                        </div>
                        <div>
                          <h4 className="font-bold">Session Title {item}</h4>
                          <p className="text-sm text-gray-400">Speaker Name</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="speakers" className="min-h-screen flex items-center justify-center bg-white text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center">Featured Speakers</h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSpeaker * 100}%)` }}>
                  {speakers.map((speaker, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg mx-auto max-w-2xl animate-fadeIn">
                        <div className="md:flex">
                          <div className="md:flex-shrink-0">
                            <img className="h-48 w-full object-cover md:w-48" src={speaker.image} alt={speaker.name} />
                          </div>
                          <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">{speaker.title}</div>
                            <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{speaker.name}</a>
                            <p className="mt-2 text-gray-600">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={prevSpeaker} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button onClick={nextSpeaker} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </section>

        <section id="workshops" className="min-h-screen flex items-center justify-center bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center">Interactive Workshops</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((workshop, index) => (
                <div
                  key={workshop}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fadeInUp"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <h3 className="text-2xl font-bold mb-4">Workshop Title {workshop}</h3>
                  <p className="text-white mb-6">
                    Join us for an immersive hands-on experience in cutting-edge technology. Learn from industry
                    experts and gain practical skills you can apply immediately.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-white" />
                      <span>Day {workshop}, 2:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-white" />
                      <span>Limited to 150 participants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="venue" className="min-h-screen flex items-center justify-center bg-white text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Venue</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fadeInLeft">
                <h3 className="text-2xl font-bold mb-4">Convention Center</h3>
                <p className="text-lg mb-6">
                  Join us at the state-of-the-art Convention Center, located in the heart of Silicon Valley.
                  This modern venue offers cutting-edge facilities and a perfect atmosphere for innovation and
                  collaboration.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <MapPin className="w-6 h-6 text-orange-500" />
                  <span>123 Indian Avenue, India</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors duration-300"
                >
                  <span>View on Google Maps</span>
                  <ChevronDown className="w-4 h-4 transform -rotate-90" />
                </a>
              </div>
              <div className="relative animate-fadeInRight">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 transform -skew-y-6  rounded-3xl shadow-lg"></div>
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="TechHub Convention Center"
                  className="relative z-10 rounded-3xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SprintTech</h3>
              <p className="text-gray-400">Shaping the Future of Technology</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.title}>
                    <a href={`#${section.title.toLowerCase()}`} className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and exclusive content.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SprintTech. Made with ❤️ by UTKARSHWX</p>
          </div>
        </div>
      </footer>
    </div>
  )
}