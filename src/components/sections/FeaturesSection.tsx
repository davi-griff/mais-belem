import { Leaf, Globe, Users } from 'lucide-react'
import { FeatureCard } from '../cards/FeatureCard'

export function FeaturesSection() {
  const features = [
    {
      icon: <Leaf className="h-12 w-12 text-[rgb(28,57,28)]" />,
      title: "Acomodações Sustentáveis",
      description: "Todas as nossas listagens atendem a critérios ecológicos rigorosos, garantindo uma estadia de baixo impacto."
    },
    {
      icon: <Globe className="h-12 w-12 text-[rgb(28,57,28)]" />,
      title: "Experiências Locais",
      description: "Mergulhe na cultura de Belém com nossos eco-tours e atividades selecionadas."
    },
    {
      icon: <Users className="h-12 w-12 text-[rgb(28,57,28)]" />,
      title: "Apoio à Comunidade",
      description: "Sua estadia beneficia diretamente as comunidades locais e os esforços de conservação."
    }
  ]

  return (
    <section className="py-16 bg-[#f0f4e0]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#5d0d6d]">
          Nossos Recursos Ecológicos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}