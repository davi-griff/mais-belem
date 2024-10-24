'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
import { Header } from '@/components/layout/Header'

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

export default function RestaurantBookingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reservationDetails, setReservationDetails] = useState({
    date: '',
    time: '',
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

  const handleReservationSubmit = () => {
    console.log('Reservation submitted:', { restaurant: selectedRestaurant, ...reservationDetails });
    alert('Reservation request sent. The restaurant will confirm your booking shortly.');
  };

  const restaurants = [
    { 
      id: 1, 
      name: "Sabor da Amazônia", 
      description: "Authentic Amazonian cuisine",
      longDescription: "Experience the rich flavors of the Amazon rainforest with our sustainable and locally-sourced menu.",
      location: "Centro, Belém", 
      priceRange: "$$", 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4557, -48.4902],
      availableTables: 5,
      greenSealReason: "Uses only locally-sourced ingredients, implements a zero-waste policy, and supports local indigenous communities."
    },
    { 
      id: 2, 
      name: "Verde Bistro", 
      description: "Eco-friendly fusion restaurant",
      longDescription: "A perfect blend of international cuisine with Amazonian ingredients, all prepared with sustainability in mind.",
      location: "Cidade Velha, Belém", 
      priceRange: "$$$", 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4589, -48.5074],
      availableTables: 3,
      greenSealReason: "Operates on 100% renewable energy, uses biodegradable packaging, and has an on-site organic garden."
    },
    { 
      id: 3, 
      name: "Mangal Sustentável", 
      description: "Riverside sustainable dining",
      longDescription: "Enjoy breathtaking views of the Amazon River while savoring our sustainable seafood and plant-based dishes.",
      location: "Nazaré, Belém", 
      priceRange: "$$$$", 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4522, -48.4827],
      availableTables: 2,
      greenSealReason: "Practices responsible fishing, uses energy-efficient appliances, and actively participates in local river clean-up initiatives."
    },
    { 
      id: 4, 
      name: "Açaí Eco Café", 
      description: "Sustainable Amazonian snacks",
      longDescription: "A cozy café offering a variety of açaí bowls, Amazonian fruits, and organic coffee in an eco-friendly setting.",
      location: "Umarizal, Belém", 
      priceRange: "$", 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4468, -48.4789],
      availableTables: 8,
      greenSealReason: "Sources açaí and other fruits from sustainable local farms, uses compostable utensils, and runs educational programs on Amazonian ecology."
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
      {/* <header className="bg-[#5d0d6d] text-[#D3D3D5] p-4 fixed w-full z-50">
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
      </header> */}

      <Header />

      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-[#5d0d6d] mb-8">Reserva em Restaurantes Sustentáveis</h2>
          
          <div className="mb-8 relative z-10">
            <Card>
              <CardContent className="p-0">
                <div className="h-[400px]">
                  <MapContainer center={[-1.4558, -48.4902]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {restaurants.map((restaurant) => (
                      <Marker key={restaurant.id} position={restaurant.coordinates} icon={customIcon}>
                        <Popup>
                          <div>
                            <h3 className="font-bold">{restaurant.name}</h3>
                            <p>{restaurant.location}</p>
                            <p className="font-semibold">Faixa de preço: {restaurant.priceRange}</p>
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
              <Input type="date" placeholder="Data" className="w-40" />
              <Input type="time" placeholder="Hora" className="w-40" />
              <Input type="number" placeholder="Pessoas" className="w-32" min="1" />
              <Button className="bg-[#93b31f] text-[#5d0d6d]">
                <Search className="mr-2 h-4 w-4" /> Buscar
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all duration-300 hover:scale-105 rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-[#5d0d6d]">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-2">{restaurant.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{restaurant.longDescription}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-green-600">Faixa de preço: {restaurant.priceRange}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300"
                          onClick={() => setSelectedRestaurant(restaurant)}
                        >
                          Reservar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-[#5d0d6d]">Reserva - {restaurant.name}</DialogTitle>
                          <DialogDescription>
                            Preencha os detalhes da sua reserva abaixo.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                              Data
                            </Label>
                            <Input 
                              id="date" 
                              type="date"
                              className="col-span-3" 
                              onChange={(e) => handleReservationChange('date', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">
                              Hora
                            </Label>
                            <Input 
                              id="time" 
                              type="time"
                              className="col-span-3" 
                              onChange={(e) => handleReservationChange('time', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="guests" className="text-right">
                              Pessoas
                            </Label>
                            <Select 
                              onValueChange={(value) => handleReservationChange('guests', parseInt(value))}
                              defaultValue="1"
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Selecione o número de pessoas" />
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
                        <DialogFooter>
                          <Button type="submit" onClick={handleReservationSubmit} className="w-full bg-[#93b31f] text-[#5d0d6d] hover:bg-[#7a9619] transition-colors duration-300">
                            Confirmar Reserva
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p className="text-orange-500 font-semibold text-sm">Apenas {restaurant.availableTables} mesas disponíveis</p>
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full bg-green-100 text-green-800 hover:bg-green-200 flex items-center justify-center gap-2 transition-colors duration-300">
                          <Leaf className="h-4 w-4" />
                          Selo Verde
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-green-800">Certificação Selo Verde</DialogTitle>
                          <DialogDescription className="text-base">
                            Entendendo as práticas sustentáveis
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <p className="mb-4">
                            O Selo Verde é concedido a estabelecimentos que demonstram um compromisso excepcional com a
                            sustentabilidade ambiental e práticas ecológicas. Esses locais vão além em seus esforços para minimizar seu
                            impacto ambiental e promover o turismo sustentável.
                          </p>
                          <p className="font-semibold mb-2">{restaurant.name} recebeu esta certificação porque:</p>
                          <p className="text-green-700">{restaurant.greenSealReason}</p>
                        </div>
                        <DialogClose asChild>
                          <Button className="mt-4 bg-green-600 text-white hover:bg-green-700">Fechar</Button>
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
