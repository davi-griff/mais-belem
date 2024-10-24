'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      <Input 
        type="text" 
        placeholder="Localização" 
        className="flex-grow"
      />
      <Input 
        type="date" 
        placeholder="Check-in" 
        className="w-40"
      />
      <Input 
        type="date" 
        placeholder="Check-out" 
        className="w-40"
      />
      <Input 
        type="number" 
        placeholder="Hóspedes" 
        className="w-32"
        min="1"
      />
      <Button className="bg-[#93b31f] text-[#5d0d6d] hover:bg-[#7a9619] transition-colors">
        <Search className="mr-2 h-4 w-4" /> 
        Buscar
      </Button>
    </div>
  )
}