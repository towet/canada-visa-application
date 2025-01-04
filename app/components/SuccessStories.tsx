"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const stories = [
  {
    name: "Miriam Mwangi",
    role: "International Student",
    story: "As an international student at the University of British Columbia, I found Canada incredibly welcoming. The application process was straightforward thanks to resources provided by both governments. I've made lifelong friends here and had amazing internship opportunities that set me on the path to success.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4wJ2Tn586SPkFKPKbl4KhMBUoQWXahBDswg&s"
  },
  {
    name: "David Kimani",
    role: "Healthcare Professional",
    story: "After years of working as a nurse in Kenya, I applied for immigration through Express Entry on this platform. The support from fellow Kenyans who had already made the move was invaluable! Today, I work at a hospital in Calgary where I feel valued and appreciated.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ24S0Xkgj5PK-tmP8ngH8ajG5f3oOVSrl0Q&s"
  },
  {
    name: "Onyango Caleb",
    role: "Airport Attendant",
    story: "Moving from Kenya to Canada was daunting but worth it! I secured my permanent residency within six months through Express Entry and now work as an airport attendant in Vancouver. The opportunities here are endless!",
    image: "https://media.licdn.com/dms/image/v2/D4E10AQGxMuKbIDIlrA/image-shrink_800/image-shrink_800/0/1733945416663?e=2147483647&v=beta&t=jNA4lMQv3R8txMfInRqcjZ37fj01BDl6QeMEtuBdLI8"
  },
  {
    name: "Alice Waweru",
    role: "Culinary Pioneer",
    story: "Alice Waweru is a talented chef who moved to Canada with dreams of sharing Kenyan cuisine with a broader audience. After facing initial challenges in securing employment due to credential recognition issues, Alice pivoted her focus towards entrepreneurship.",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGfTiL9eDV6RA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1711172453027?e=2147483647&v=beta&t=5NRPMuwz-UAzMDOmw8ix7b0X8d7ce5RgnDgPtpIR-3w"
  },
  {
    name: "Fatima J.",
    role: "Family Sponsorship",
    story: "I was able to reunite with my husband through the Family Sponsorship program after he became a permanent resident in Canada. Thanks to this platform and the community, our family is now together and thriving in our new home.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4_rPoHeumYXx2vt948ESD9kD_pKZYWSV67w&s"
  }
]

export default function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length)
    }, 5000) // Change story every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Success Stories</h2>
        <div className="relative h-[400px] md:h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="p-6 flex flex-col md:flex-row items-center">
                  <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <Image
                      src={stories[currentIndex].image}
                      alt={stories[currentIndex].name}
                      width={150}
                      height={150}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{stories[currentIndex].name}</h3>
                    <p className="text-gray-600 mb-2">{stories[currentIndex].role}</p>
                    <p className="text-gray-800">{stories[currentIndex].story}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-6">
          {stories.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? 'bg-red-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

