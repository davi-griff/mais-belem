'use client'

import { Button } from "@/components/ui/button"
import { Leaf } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

interface GreenSealDialogProps {
  hotel: {
    name: string
    greenSealReason: string
  }
}

export function GreenSealDialog({ hotel }: GreenSealDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full bg-green-100 text-green-800 hover:bg-green-200 flex items-center justify-center gap-2 transition-colors duration-300"
        >
          <Leaf className="h-4 w-4" />
          Selo Verde
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-800">
            Certificação Selo Verde
          </DialogTitle>
          <DialogDescription className="text-base">
            Entendendo as práticas sustentáveis
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p className="mb-4">
            O Selo Verde é concedido a estabelecimentos que demonstram 
            compromisso excepcional com a sustentabilidade ambiental e 
            práticas ecológicas. Estes locais vão além em seus esforços 
            para minimizar seu impacto ambiental e promover o turismo sustentável.
          </p>
          <p className="font-semibold mb-2">
            {hotel.name} recebeu esta certificação porque:
          </p>
          <p className="text-green-700">{hotel.greenSealReason}</p>
        </div>
        <DialogClose asChild>
          <Button className="mt-4 bg-green-600 text-white hover:bg-green-700">
            Fechar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}