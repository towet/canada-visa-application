import { Card, CardContent } from "@/components/ui/card"

export default function VisaTypesSection() {
  const visaTypes = [
    { title: "Work Visa", description: "For skilled professionals seeking employment opportunities" },
    { title: "Student Visa", description: "For international students pursuing education in Canada" },
    { title: "Family Sponsorship", description: "For those with family members who are Canadian citizens or permanent residents" },
    { title: "Express Entry", description: "Fast-track immigration for skilled workers" },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Visa Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visaTypes.map((visa, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{visa.title}</h3>
                <p className="text-gray-600">{visa.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

