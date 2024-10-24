'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Search, Menu, X, Calendar, Users, Leaf, Info } from 'lucide-react'
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

// Leaflet icon setup
delete (L.Icon.Default.prototype as any)._getIconUrl;
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

export default function AttractionPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  interface Attraction {
    id: number;
    name: string;
    description: string;
    longDescription: string;
    location: string;
    image: string;
    coordinates: [number, number];
    openingHours: string;
    entryFee: string;
    sustainabilityInfo: string;
  }

  const attractions: Attraction[] = [
    { 
      id: 1, 
      name: "Ver-o-Peso", 
      description: "Iconic open-air market",
      longDescription: "The largest open-air market in Latin America, offering a vibrant display of Amazonian products and culture.",
      location: "Cidade Velha, Belém", 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4539, -48.5024],
      openingHours: "24 hours daily",
      entryFee: "Free",
      sustainabilityInfo: "Promotes local products and traditional Amazonian culture, supporting local communities and sustainable practices."
    },
    { 
      id: 2, 
      name: "Basílica de Nazaré", 
      description: "Neoclassical basilica",
      longDescription: "A beautiful neoclassical church that hosts the annual Círio de Nazaré, one of the world's largest religious processions.",
      location: "Nazaré, Belém", 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4522, -48.4827],
      openingHours: "7:00 AM - 7:00 PM",
      entryFee: "Free",
      sustainabilityInfo: "Implements energy-saving measures and promotes cultural preservation through educational programs."
    },
    { 
      id: 3, 
      name: "Estação das Docas", 
      description: "Revitalized port complex",
      longDescription: "A former port area transformed into a modern entertainment complex with restaurants, bars, and cultural spaces.",
      location: "Campina, Belém", 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4492, -48.4990],
      openingHours: "10:00 AM - 12:00 AM",
      entryFee: "Free entry (individual attractions may have fees)",
      sustainabilityInfo: "Utilizes solar energy, practices waste recycling, and promotes local artisans and sustainable businesses."
    },
    { 
      id: 4, 
      name: "Mangal das Garças", 
      description: "Ecological park",
      longDescription: "A beautiful ecological park showcasing the flora and fauna of the Amazon region, including a butterfly garden and bird sanctuary.",
      location: "Cidade Velha, Belém", 
      image: "/placeholder.svg?height=200&width=300", 
      coordinates: [-1.4669, -48.5055],
      openingHours: "9:00 AM - 6:00 PM (Closed on Mondays)",
      entryFee: "R$ 10",
      sustainabilityInfo: "Focuses on environmental education, conservation of local species, and sustainable landscaping practices."
    },
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

      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-[#5d0d6d] mb-8">Pontos Turísticos Sustentáveis em Belém</h2>
          
          <div className="mb-8 relative z-10">
            <Card>
              <CardContent className="p-0">
                <div className="h-[400px]">
                  <MapContainer center={[-1.4558, -48.4902]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {attractions.map((attraction) => (
                      <Marker key={attraction.id} position={attraction.coordinates} icon={customIcon}>
                        <Popup>
                          <div>
                            <h3 className="font-bold">{attraction.name}</h3>
                            <p>{attraction.location}</p>
                            <p className="font-semibold">{attraction.description}</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
            <div className="mt-4 flex flex-wrap gap-4">
              <Input type="text" placeholder="Buscar atrações" className="flex-grow" />
              <Button className="bg-[#93b31f] text-[#5d0d6d]">
                <Search className="mr-2 h-4 w-4" /> Buscar
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {attractions.map((attraction) => (
              <Card key={attraction.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all duration-300 hover:scale-105 rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-[#5d0d6d]">{attraction.name}</h3>
                  <p className="text-gray-600 mb-2">{attraction.description}</p>
                  <p className="text-sm text-gray-500 mb-4">{attraction.longDescription}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-green-600">{attraction.entryFee}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300"
                          onClick={() => setSelectedAttraction(attraction)}
                        >
                          Mais Informações
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-[#5d0d6d]">{attraction.name}</DialogTitle>
                          <DialogDescription>
                            Detalhes sobre a atração
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-bold">Localização</Label>
                            <span className="col-span-3">{attraction.location}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-bold">Horário</Label>
                            <span className="col-span-3">{attraction.openingHours}</span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right font-bold">Entrada</Label>
                            <span className="col-span-3">{attraction.entryFee}</span>
                          </div>
                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right font-bold">Sustentabilidade</Label>
                            <p className="col-span-3 text-sm">{attraction.sustainabilityInfo}</p>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button className="bg-[#93b31f] text-[#5d0d6d] hover:bg-[#7a9619] transition-colors duration-300">
                              Fechar
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full bg-green-100 text-green-800 hover:bg-green-200 flex items-center justify-center gap-2 transition-colors duration-300">
                      <Leaf className="h-4 w-4" />
                      Atração Sustentável
                    </Button>
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
