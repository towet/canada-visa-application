"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const headlines = [
  {
    title: "Your Gateway to Canada",
    content: "With recent partnerships between various countries and Canada, there has never been a better time to explore immigration opportunities. Canada is not only a land of stunning landscapes but also a hub for skilled professionals, students, and families seeking a better life.",
    image: "/placeholder.svg?height=400&width=600",
    alt: "Canadian landscape"
  },
  {
    title: "Unlock Your Potential in Canada",
    content: "Canada's booming tech industry and world-class universities offer unparalleled opportunities for career growth and education. Join the ranks of innovators and leaders shaping the future in one of the world's most welcoming nations.",
    image: "/placeholder.svg?height=400&width=600",
    alt: "Canadian university campus"
  },
  {
    title: "A Multicultural Haven",
    content: "Embrace diversity in Canada's vibrant, multicultural society. From bustling cities to serene natural wonders, discover a country that celebrates differences and offers a high quality of life for all its residents.",
    image: "/placeholder.svg?height=400&width=600",
    alt: "Diverse group of people in a Canadian city"
  },
  {
    title: "Your Family's Future Awaits",
    content: "Canada's excellent healthcare, education, and social services make it an ideal destination for families. Provide your children with opportunities to thrive in a safe, prosperous environment that values inclusivity and personal growth.",
    image: "/placeholder.svg?height=400&width=600",
    alt: "Happy family in a Canadian park"
  }
]

export default function ScrollingHeadlines() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length)
    }, 5000) // Change headline every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Discover Your Canadian Dream</h2>
        <div className="relative overflow-hidden" style={{ height: '400px' }}>
          {headlines.map((headline, index) => (
            <Card 
              key={index} 
              className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <CardContent className="p-0 h-full">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-1/2 relative">
                    <Image
                      src={headline.image}
                      alt={headline.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{headline.title}</h3>
                    <p className="mb-6">{headline.content}</p>
                    <Button className="self-start bg-red-600 hover:bg-red-700 text-white">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

