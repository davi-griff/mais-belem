import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 bg-[#5d0d6d] text-[#D3D3D5]">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-4">
          Pronto para Sua Eco-Aventura em Belém?
        </h2>
        <p className="text-xl mb-8">
          Junte-se a nós para tornar a COP-30 a conferência mais sustentável de todas!
        </p>
        <Button 
          size="lg" 
          variant="outline" 
          className="bg-[#D3D3D5] text-[#5d0d6d] px-6 py-3 text-base hover:bg-[#93b31f] hover:text-[#D3D3D5] transition-colors"
        >
          Explorar Estadias Ecológicas
        </Button>
      </div>
    </section>
  )
}