import { HotelCard } from './HotelCard'

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

interface HotelListProps {
  hotels: Hotel[]
}

export function HotelList({ hotels }: HotelListProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}