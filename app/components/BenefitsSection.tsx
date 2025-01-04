import { Card, CardContent } from "@/components/ui/card"
import { MapIcon as Maple, Building, GraduationCap, Heart } from 'lucide-react'

export default function BenefitsSection() {
  const benefits = [
    { icon: <Maple className="h-8 w-8 text-red-600" />, title: "High Quality of Life", description: "Enjoy world-class healthcare, education, and social services" },
    { icon: <Building className="h-8 w-8 text-red-600" />, title: "Thriving Economy", description: "Access to diverse job opportunities and a stable economic environment" },
    { icon: <GraduationCap className="h-8 w-8 text-red-600" />, title: "Excellent Education", description: "Top-tier universities and colleges for continuous learning" },
    { icon: <Heart className="h-8 w-8 text-red-600" />, title: "Multicultural Society", description: "Embrace diversity and inclusivity in a welcoming community" },
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Canada?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center text-center p-6">
                {benefit.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

