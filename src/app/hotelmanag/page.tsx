'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

export default function HotelManagement() {
  const [hotels, setHotels] = useState([
    { id: 1, name: "Eco Hotel Belém", location: "Centro, Belém", price: 150, sustainability: "High" },
    { id: 2, name: "Green Lodge Belém", location: "Cidade Velha, Belém", price: 180, sustainability: "Medium" },
    { id: 3, name: "Sustentável Suites", location: "Nazaré, Belém", price: 220, sustainability: "High" },
  ])
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    sustainability: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewHotel(prev => ({ ...prev, [name]: value }))
  }

  const handleSustainabilityChange = (value) => {
    setNewHotel(prev => ({ ...prev, sustainability: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = hotels.length + 1
    setHotels(prev => [...prev, { id, ...newHotel, price: Number(newHotel.price) }])
    setNewHotel({ name: '', location: '', description: '', price: '', sustainability: '' })
  }

  const handleDelete = (id) => {
    setHotels(prev => prev.filter(hotel => hotel.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-[#5d0d6d] mb-8">Gerenciamento de Hotéis</h1>
      
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Hotéis</TabsTrigger>
          <TabsTrigger value="add">Adicionar Hotel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Hotéis Cadastrados</CardTitle>
              <CardDescription>Lista de todos os hotéis sustentáveis cadastrados.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Preço (R$)</TableHead>
                    <TableHead>Sustentabilidade</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hotels.map((hotel) => (
                    <TableRow key={hotel.id}>
                      <TableCell>{hotel.name}</TableCell>
                      <TableCell>{hotel.location}</TableCell>
                      <TableCell>{hotel.price}</TableCell>
                      <TableCell>{hotel.sustainability}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar Hotel</DialogTitle>
                                <DialogDescription>Faça as alterações necessárias e salve.</DialogDescription>
                              </DialogHeader>
                              {/* Add form fields for editing here */}
                              <DialogFooter>
                                <Button type="submit">Salvar Alterações</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(hotel.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Hotel</CardTitle>
              <CardDescription>Preencha os detalhes do novo hotel sustentável.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Hotel</Label>
                  <Input id="name" name="name" value={newHotel.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input id="location" name="location" value={newHotel.location} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" name="description" value={newHotel.description} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Preço por Noite (R$)</Label>
                  <Input id="price" name="price" type="number" value={newHotel.price} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sustainability">Nível de Sustentabilidade</Label>
                  <Select onValueChange={handleSustainabilityChange} value={newHotel.sustainability}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Baixo</SelectItem>
                      <SelectItem value="Medium">Médio</SelectItem>
                      <SelectItem value="High">Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-[#93b31f] text-[#5d0d6d] hover:bg-[#7a9619]">
                  <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Hotel
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}