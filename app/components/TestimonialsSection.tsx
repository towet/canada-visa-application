import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialsSection() {
  const testimonials = [
    { name: "Sarah Thompson", image: "/placeholder.svg?height=100&width=100", text: "The visa application process was so smooth. I'm now living my dream in Canada!" },
    { name: "Michael Chen", image: "/placeholder.svg?height=100&width=100", text: "I couldn't believe how easy it was. The team guided me every step of the way." },
    { name: "Elena Rodriguez", image: "/placeholder.svg?height=100&width=100", text: "From application to approval, everything was handled professionally. Highly recommended!" },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4"
                />
                <p className="italic mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

