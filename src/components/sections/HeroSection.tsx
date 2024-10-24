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
          className="opacity-70 object-cover"
        />
      </div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto p-12 bg-black/60 rounded-3xl backdrop-blur-sm">
        <h2 className="text-6xl font-extrabold mb-6 text-[#D3D3D5] text-shadow-lg tracking-tight">
          <span className="text-[#93B31F]">+</span>Belém
        </h2>
        <p className="text-3xl mb-10 text-[#D3D3D5] text-shadow-md font-light leading-relaxed">
          Hospedagens Sustentáveis para a COP-30
        </p>
        
        <div className="max-w-md mx-auto flex bg-[#D3D3D5] rounded-full overflow-hidden shadow-2xl">
          <Input 
            type="text" 
            placeholder="Buscar hospedagens ecológicas..." 
            className="flex-grow border-none px-6 py-4 text-[#5d0d6d] text-lg"
          />
          <Button className="rounded-r-full bg-[#BD5DC1] text-[#D3D3D5] px-8 py-4 hover:bg-[#a34da7] transition-colors duration-300">
            <Search className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
