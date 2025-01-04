"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ads = [
  {
    title: "Your Gateway to Canada",
    content: "With the recent partnership between the Government of Kenya and Canada, there has never been a better time to explore immigration opportunities. Canada is not only a land of stunning landscapes but also a hub for skilled professionals, students, and families seeking a better life. Join countless Kenyans who have successfully made Canada their new home!",
    image: "https://uzalendonews.co.ke/wp-content/uploads/2023/05/canada-ruto-696x392.jpg",
    alt: "Canada-Kenya partnership",
    socialProof: ""
  },
  {
    title: "Join Canada's Workforce",
    content: "Canada is actively seeking skilled professionals to fill critical roles in various sectors, including healthcare, technology, and engineering. The Express Entry system fast-tracks immigration for qualified individuals. With a supportive community and robust job market, your skills can thrive in Canada!",
    image: "https://cpnis.com/wp-content/uploads/2023/06/Federal_Skilled_Worker_Program.jpg",
    alt: "Canadian workforce",
    socialProof: "Over 13,000 Kenyans have successfully immigrated to Canada in recent years, contributing to the economy and enriching the cultural landscape."
  },
  {
    title: "Transform Your Educational Journey",
    content: "Canada offers world-class education with diverse programs tailored to international students. The partnership with Kenya ensures streamlined processes for obtaining student visas. Experience a multicultural environment while gaining valuable qualifications that are recognized globally.",
    image: "https://immigtoronto.com/wp-content/uploads/2022/08/13-aug-1.jpg",
    alt: "Students in Canada",
    socialProof: "In 2022 alone, the number of Kenyan students in Canada increased by 25%, highlighting Canada's appeal as a top educational destination."
  },
  {
    title: "Reuniting Loved Ones",
    content: "The Family Sponsorship program allows you to bring your family members to Canada if they are citizens or permanent residents. This initiative strengthens family ties and provides a supportive environment for newcomers.",
    image: "https://byblacks.com/media/k2/items/cache/7e8a47dfc4d554b6f15d329bcbb69029_L.jpg?t=20220907_151238",
    alt: "Family reunited in Canada",
    socialProof: "Families across Kenya have successfully reunited in Canada, creating vibrant communities that support one another through the transition."
  },
  {
    title: "Express Entry: Fast-Track Your Immigration Journey",
    content: "The Express Entry system is designed for skilled workers who want to immigrate quickly. With regular draws based on occupation demand, your dream of living in Canada can become a reality sooner than you think.",
    image: "https://croyezimmigration.com/wp-content/uploads/2021/05/1.png",
    alt: "Express Entry process",
    socialProof: "The Canadian government has increased its immigration targets for skilled workers by 10% this year, reflecting the high demand for talent."
  }
]

export default function ScrollingAds() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length)
    }, 8000) // Change ad every 8 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Discover Your Canadian Opportunities</h2>
        <div className="relative overflow-hidden" style={{ height: '500px' }}>
          {ads.map((ad, index) => (
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
                      src={ad.image}
                      alt={ad.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{ad.title}</h3>
                    <p className="mb-4">{ad.content}</p>
                    {ad.socialProof && (
                      <p className="mb-4 italic text-sm">{ad.socialProof}</p>
                    )}
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

