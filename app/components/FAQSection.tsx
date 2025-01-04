import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQSection() {
  const faqs = [
    { question: "How long does the visa application process take?", answer: "The processing time varies depending on the type of visa and individual circumstances. Typically, it can take anywhere from a few weeks to several months." },
    { question: "What documents do I need for my application?", answer: "Required documents may include a valid passport, proof of funds, educational qualifications, work experience certificates, and language proficiency test results. Our team will guide you through the specific requirements for your visa type." },
    { question: "Can I bring my family with me to Canada?", answer: "Yes, many visa types allow you to bring your spouse and dependent children. We can help you with family sponsorship and dependent visa applications." },
    { question: "What happens if my visa application is rejected?", answer: "If your application is rejected, we'll review the reasons and help you address any issues. In many cases, you can reapply with additional information or consider alternative visa options." },
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

