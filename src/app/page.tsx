import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { AdvantagesSection } from '@/components/sections/AdvantagesSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main className="flex-grow pt-16">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <AdvantagesSection />
      <CTASection />
    </main>
  )
}