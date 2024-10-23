import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-belem.jpg"
          alt="Paisagem de Belém"
          fill
          priority
          className="opacity-70"
        />
      </div>
      
      <div className="relative z-10 text-center max-w-7xl mx-auto p-8 bg-black/50 rounded-2xl">
        <h2 className="text-5xl font-bold mb-4 text-[#D3D3D5] text-shadow">
          Hospedagens Sustentáveis para a COP-30 em Belém
        </h2>
        <p className="text-2xl mb-8 text-[#D3D3D5] text-shadow">
          Experimente acomodações ecológicas enquanto causa um impacto positivo
        </p>
        
        <div className="max-w-md mx-auto flex bg-[#D3D3D5] rounded-full overflow-hidden shadow-lg">
          <Input 
            type="text" 
            placeholder="Buscar hospedagens ecológicas..." 
            className="flex-grow border-none px-6 py-3 text-[#5d0d6d]"
          />
          <Button className="rounded-r-full bg-[#5d0d6d] text-[#D3D3D5] px-6 py-3">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
