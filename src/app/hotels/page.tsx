'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Search, Menu, X, Calendar, Users, Leaf } from 'lucide-react'
import Image from 'next/image'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from '@/components/layout/Navigation'

// Leaflet icon setup (unchanged)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function HotelBookingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [reservationDetails, setReservationDetails] = useState({
    rooms: 1,
    guests: 1,
    name: '',
    email: '',
    phone: '',
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleReservationChange = (field, value) => {
    setReservationDetails(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotalPrice = () => {
    if (!selectedHotel) return 0;
    return selectedHotel.price * reservationDetails.rooms * reservationDetails.guests;
  };

  const handleReservationSubmit = () => {
    // Here you would typically send the reservation details to your backend
    console.log('Reservation submitted:', { hotel: selectedHotel, ...reservationDetails });
    // Proceed to payment gateway
    alert('Proceeding to payment gateway...');
  };

  const hotels = [
    { 
      id: 1, 
      name: "Eco Hotel Belém", 
      description: "Sustainable luxury hotel",
      longDescription: "Experience eco-friendly luxury with stunning views of the Amazon River.",
      location: "Centro, Belém", 
      price: 150, 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4557, -48.4902],
      roomsLeft: 2,
      greenSealReason: "It uses renewable energy sources, implements water conservation measures, and sources local, organic products for its restaurant."
    },
    { 
      id: 2, 
      name: "Green Lodge Belém", 
      description: "Eco-conscious accommodations",
      longDescription: "Stay in harmony with nature in our sustainable lodge.",
      location: "Cidade Velha, Belém", 
      price: 180, 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4589, -48.5074],
      roomsLeft: 5,
      greenSealReason: "The lodge uses solar power, has a comprehensive recycling program, and offers eco-tours to educate guests about local biodiversity."
    },
    { 
      id: 3, 
      name: "Sustentável Suites", 
      description: "Eco-friendly urban retreat",
      longDescription: "Modern suites with a commitment to sustainability in the heart of Belém.",
      location: "Nazaré, Belém", 
      price: 220, 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4522, -48.4827],
      roomsLeft: 3,
      greenSealReason: "All suites are equipped with energy-efficient appliances, use rainwater harvesting systems, and the building features a green roof to reduce urban heat island effect."
    },
    { 
      id: 4, 
      name: "Pousada Eco Friendly", 
      description: "Cozy sustainable guesthouse",
      longDescription: "A charming guesthouse that puts the environment first without compromising on comfort.",
      location: "Umarizal, Belém", 
      price: 150, 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4468, -48.4789],
      roomsLeft: 1,
      greenSealReason: "The guesthouse is built with sustainable materials, uses natural ventilation to reduce energy consumption, and has an organic garden that supplies the in-house kitchen."
    },
  ];

  const attractions = [
    { id: 1, name: "Ver-o-Peso", coordinates: [-1.4539, -48.5024] },
    { id: 2, name: "Basílica de Nazaré", coordinates: [-1.4522, -48.4827] },
    { id: 3, name: "Estação das Docas", coordinates: [-1.4492, -48.4990] },
    { id: 4, name: "Mangal das Garças", coordinates: [-1.4669, -48.5055] },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#5d0d6d] text-[#D3D3D5] p-4 fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <h1 className="text-2xl font-bold">
              <span className="text-[#93b31f] text-3xl font-extrabold">+</span>Belém
            </h1>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <Navigation className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center w-full md:w-auto`} />
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuário" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="text-[#D3D3D5] border-[#D3D3D5]" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="text-[#D3D3D5] border-[#D3D3D5]" onClick={handleLogin}>
                  Entrar
                </Button>
                <Button className="bg-[#93b31f] text-[#5d0d6d]">
                  Cadastrar
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24"> {/* Increased padding-top */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-[#5d0d6d] mb-8">Reserva de Hotéis Sustentáveis</h2>
          
          <div className="mb-8 relative z-10"> {/* Added relative positioning and z-index */}
            <Card>
              <CardContent className="p-0">
                <div className="h-[400px]">
                  <MapContainer center={[-1.4558, -48.4902]} zoom={13} style={{ height: '100%', width: '100%' }}>
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
            <div className="mt-4 flex flex-wrap gap-4">
              <Input type="text" placeholder="Localização" className="flex-grow" />
              <Input type="date" placeholder="Check-in" className="w-40" />
              <Input type="date" placeholder="Check-out" className="w-40" />
              <Input type="number" placeholder="Hóspedes" className="w-32" />
              <Button className="bg-[#93b31f] text-[#5d0d6d]">
                <Search className="mr-2 h-4 w-4" /> Buscar
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
                    <span className="text-3xl font-bold text-green-600">R$ {hotel.price}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300"
                          onClick={() => setSelectedHotel(hotel)}
                        >
                          Reserve
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-[#5d0d6d]">Reserva - {hotel.name}</DialogTitle>
                          <DialogDescription>
                            Preencha os detalhes da sua reserva abaixo.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rooms" className="text-right">
                              Quartos
                            </Label>
                            <Select 
                              onValueChange={(value) => handleReservationChange('rooms', parseInt(value))}
                              defaultValue="1"
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
                            <Label htmlFor="guests" className="text-right">
                              Hóspedes
                            </Label>
                            <Select 
                              onValueChange={(value) => handleReservationChange('guests', parseInt(value))}
                              defaultValue="1"
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
                            <Label htmlFor="name" className="text-right">
                              Nome
                            </Label>
                            <Input 
                              id="name" 
                              className="col-span-3" 
                              onChange={(e) => handleReservationChange('name', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input 
                              id="email" 
                              type="email" 
                              className="col-span-3" 
                              onChange={(e) => handleReservationChange('email', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                              Telefone
                            </Label>
                            <Input 
                              id="phone" 
                              type="tel" 
                              className="col-span-3" 
                              onChange={(e) => handleReservationChange('phone', e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                          <span className="text-2xl font-bold text-green-600">
                            Total: R$ {calculateTotalPrice()}
                          </span>
                          <Button type="submit" onClick={handleReservationSubmit} className="w-full sm:w-auto bg-[#93b31f] text-[#5d0d6d] hover:bg-[#7a9619] transition-colors duration-300">
                            Prosseguir para Pagamento
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p className="text-orange-500 font-semibold text-sm">Only {hotel.roomsLeft} rooms left</p>
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full bg-green-100 text-green-800 hover:bg-green-200 flex items-center justify-center gap-2 transition-colors duration-300">
                          <Leaf className="h-4 w-4" />
                          Green Seal
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-green-800">Green Seal Certification</DialogTitle>
                          <DialogDescription className="text-base">
                            Understanding sustainable practices
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="mb-4">
                            The Green Seal is awarded to establishments that demonstrate exceptional commitment to environmental
                            sustainability and eco-friendly practices. These places go above and beyond in their efforts to minimize their
                            environmental impact and promote sustainable tourism.
                          </p>
                          <p className="font-semibold mb-2">{hotel.name} has earned this certification because:</p>
                          <p className="text-green-700">{hotel.greenSealReason}</p>
                        </div>
                        <DialogClose asChild>
                          <Button className="mt-4 bg-green-600 text-white hover:bg-green-700">Close</Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-[#93b31f] text-[rgb(28,57,28)] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 +Belém. Todos os direitos reservados.</p>
          <p className="mt-2">Comprometidos com o turismo sustentável para a COP-30 e além.</p>
        </div>
      </footer>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>
      <style jsx global>{`
        .leaflet-container {
          z-index: 10;
        }
        .dialog-overlay {
          z-index: 100;
        }
        .dialog-content {
          z-index: 101;
        }
      `}</style>
    </div>
  )
}
