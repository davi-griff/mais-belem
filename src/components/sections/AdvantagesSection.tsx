import { Shield, Star, TreePine, Users } from 'lucide-react'
import { AdvantageCard } from '../cards/AdvantageCard'

export function AdvantagesSection() {
  const advantages = [
    {
      icon: <Shield className="h-8 w-8 text-[rgb(28,57,28)]" />,
      title: "Credenciais Ecológicas Verificadas",
      description: "Diferentemente das plataformas genéricas, todas as nossas acomodações são verificadas quanto às suas práticas de sustentabilidade."
    },
    {
      icon: <Star className="h-8 w-8 text-[rgb(28,57,28)]" />,
      title: "Adaptado para a COP-30",
      description: "Listagens especialmente selecionadas para atender às necessidades dos participantes da conferência e viajantes conscientes."
    },
    {
      icon: <TreePine className="h-8 w-8 text-[rgb(28,57,28)]" />,
      title: "Programa de Compensação de Carbono",
      description: "Compensamos automaticamente a pegada de carbono da sua estadia, sem custo adicional para você."
    },
    {
      icon: <Users className="h-8 w-8 text-[rgb(28,57,28)]" />,
      title: "Expertise dos Anfitriões Locais",
      description: "Obtenha dicas privilegiadas e suporte de anfitriões apaixonados pela sustentabilidade e por sua cidade."
    }
  ]

  return (
    <section className="py-16 bg-[#D3D3D5]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#5d0d6d]">
          Por que Escolher a +Belém
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={index} {...advantage} />
          ))}
        </div>
      </div>
    </section>
  )
}