'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Card, CardContent } from "@/components/ui/card"

// Configuração do ícone do Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

const customIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface HotelMapProps {
  hotels: Array<{
    id: number
    name: string
    location: string
    price: number
    coordinates: [number, number]
  }>
  attractions: Array<{
    id: number
    name: string
    coordinates: [number, number]
  }>
}

export function HotelMap({ hotels, attractions }: HotelMapProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="h-[400px]">
          <MapContainer 
            center={[-1.4558, -48.4902]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {hotels.map((hotel) => (
              <Marker key={hotel.id} position={hotel.coordinates} icon={customIcon}>
                <Popup>
                  <div>
                    <h3 className="font-bold">{hotel.name}</h3>
                    <p>{hotel.location}</p>
                    <p className="font-semibold">R$ {hotel.price} / noite</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            {attractions.map((attraction) => (
              <Marker key={attraction.id} position={attraction.coordinates}>
                <Popup>
                  <div>
                    <h3 className="font-bold">{attraction.name}</h3>
                    <p>Ponto Turístico</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}