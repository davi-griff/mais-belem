export interface Hotel {
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
  
  export interface Attraction {
    id: number
    name: string
    coordinates: [number, number]
  }
  
  export interface ReservationDetails {
    rooms: number
    guests: number
    name: string
    email: string
    phone: string
  }