import HeroSection from './components/HeroSection'
import ScrollingAds from './components/ScrollingAds'
import PromotionalContent from './components/PromotionalContent'
import BenefitsSection from './components/BenefitsSection'
import VisaTypesSection from './components/VisaTypesSection'
import HowItWorksSection from './components/HowItWorksSection'
import SuccessStories from './components/SuccessStories'
import FAQSection from './components/FAQSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScrollingAds />
      <PromotionalContent />
      <BenefitsSection />
      <VisaTypesSection />
      <HowItWorksSection />
      <SuccessStories />
      <FAQSection />
    </>
  )
}
