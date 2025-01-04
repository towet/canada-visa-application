"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import ApplicationModal from "./ApplicationModal"

const promotions = [
  {
    title: "Unlocking Job Opportunities for Kenyans!",
    content: "Skilled workers can now immigrate to Canada in as little as 6 months through the Express Entry system. With increased immigration targets, your chances of selection have never been better!",
    image: "https://theinformer.co.ke/wp-content/uploads/2023/05/Mutua-Canada-e1684311720949.jpg",
    cta: "Check Your Eligibility",
    tags: ["Express Entry", "Skilled Workers", "Job Opportunities"]
  },
  {
    title: "Study in World-Class Canadian Institutions",
    content: "Gain a globally recognized education and open doors to incredible career opportunities. With streamlined student visa processes, your educational journey in Canada is just a step away.",
    image: "https://c8.alamy.com/comp/2DJBP25/study-in-canada-group-of-five-african-college-students-on-campus-at-university-yard-hold-white-blank-abroad-countries-for-student-concept-2DJBP25.jpg",
    cta: "Explore Study Programs",
    tags: ["Education", "Student Visa", "Career Growth"]
  },
  {
    title: "Family Reunification Made Easy",
    content: "Bring your loved ones to Canada and build a life together in one of the world's most welcoming countries. Our family sponsorship program is designed to keep families united.",
    image: "https://iraimmigration.com/upload/blog/a8b3ed971f047340a683dcb9d14b62b3.webp",
    cta: "Start Family Sponsorship",
    tags: ["Family Sponsorship", "Reunification", "New Life"]
  }
]

export default function PromotionalContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Unlock Your Canadian Opportunities</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="h-full flex flex-col">
              <CardContent className="p-0">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{promo.content}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {promo.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <Button 
                    className="self-start bg-red-600 hover:bg-red-700 text-white transition-colors"
                    onClick={() => setIsModalOpen(true)}
                  >
                    {promo.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        </div>
      </div>
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}

