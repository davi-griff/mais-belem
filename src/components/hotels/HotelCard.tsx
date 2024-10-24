'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Leaf } from 'lucide-react'
import { GreenSealDialog } from './GreenSealDialog'
import { BookingDialog } from './BookingDialog'

interface Hotel {
  id: number
  name: string
  description: string
  longDescription: string
  location: string
  price: number
  image: string
  coordinates: [number, number]
  roomsLeft: number
  greenSealReason: string
}

interface HotelCardProps {
  hotel: Hotel
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={hotel.image}
            alt={hotel.name}
            layout="fill"
            objectFit="cover"
            className="transition-all duration-300 hover:scale-105 rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-[#5d0d6d]">{hotel.name}</h3>
        <p className="text-gray-600 mb-2">{hotel.description}</p>
        <p className="text-sm text-gray-500 mb-4">{hotel.longDescription}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold text-green-600">
            R$ {hotel.price}
          </span>
          <BookingDialog hotel={hotel} />
        </div>
        <p className="text-orange-500 font-semibold text-sm">
          Apenas {hotel.roomsLeft} quartos disponíveis
        </p>
        <div className="mt-4">
          <GreenSealDialog hotel={hotel} />
        </div>
      </CardContent>
    </Card>
  )
}