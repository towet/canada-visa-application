import { CheckCircle } from 'lucide-react'

export default function HowItWorksSection() {
  const steps = [
    "Fill out our simple application form",
    "Our experts review your application",
    "We prepare and submit your visa application",
    "Track your application status online",
    "Receive your visa approval",
  ]

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-6">
              <CheckCircle className="h-6 w-6 text-green-500 mr-4" />
              <p className="text-lg">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

