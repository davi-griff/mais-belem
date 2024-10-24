'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

interface BookingDialogProps {
  hotel: {
    name: string
    price: number
  }
}

interface ReservationDetails {
  rooms: number
  guests: number
  name: string
  email: string
  phone: string
}

export function BookingDialog({ hotel }: BookingDialogProps) {
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails>({
    rooms: 1,
    guests: 1,
    name: '',
    email: '',
    phone: '',
  })

  const handleReservationChange = (field: keyof ReservationDetails, value: any) => {
    setReservationDetails(prev => ({ ...prev, [field]: value }))
  }

  const calculateTotalPrice = () => {
    return hotel.price * reservationDetails.rooms * reservationDetails.guests
  }

  const handleReservationSubmit = () => {
    console.log('Reservation submitted:', { hotel, ...reservationDetails })
    alert('Redirecionando para o gateway de pagamento...')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300">
          Reservar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#5d0d6d]">
            Reserva - {hotel.name}
          </DialogTitle>
          <DialogDescription>
            Preencha os detalhes da sua reserva abaixo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rooms" className="text-right">Quartos</Label>
            <Select 
              onValueChange={(value) => handleReservationChange('rooms', parseInt(value))}
              value={reservationDetails.rooms.toString()}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o número de quartos" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="guests" className="text-right">Hóspedes</Label>
            <Select 
              onValueChange={(value) => handleReservationChange('guests', parseInt(value))}
              value={reservationDetails.guests.toString()}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o número de hóspedes" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nome</Label>
            <Input 
              id="name" 
              className="col-span-3"
              value={reservationDetails.name}
              onChange={(e) => handleReservationChange('name', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input 
              id="email" 
              type="email" 
              className="col-span-3"
              value={reservationDetails.email}
              onChange={(e) => handleReservationChange('email', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">Telefone</Label>
            <Input 
              id="phone" 
              type="tel" 
              className="col-span-3"
              value={reservationDetails.phone}
              onChange={(e) => handleReservationChange('phone', e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-2xl font-bold text-green-600">
            Total: R$ {calculateTotalPrice()}
          </span>
          <Button 
            type="submit" 
            onClick={handleReservationSubmit}
            className="w-full sm:w-auto bg-[#93b31f] text-[#5d0d6d] hover:bg-[#7a9619] transition-colors duration-300"
          >
            Prosseguir para Pagamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}