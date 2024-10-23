'use client'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Utensils, Hotel, Landmark } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  isLoggedIn: boolean
  handleLogin: () => void
  handleLogout: () => void
}

export function MobileMenu({ isOpen, isLoggedIn, handleLogin, handleLogout }: MobileMenuProps) {
  if (!isOpen) return null

  const navItems = [
    { href: "#reservations", icon: <Calendar size={20} />, label: "Reservas" },
    { href: "#restaurants", icon: <Utensils size={20} />, label: "Restaurantes" },
    { href: "#hotels", icon: <Hotel size={20} />, label: "Hotéis" },
    { href: "#attractions", icon: <Landmark size={20} />, label: "Pontos Turísticos" },
  ]

  return (
    <div className="md:hidden bg-[#5d0d6d] p-4">
      <nav>
        <ul className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.href} 
                className="flex items-center gap-2 text-[#D3D3D5]"
              >
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-4 flex flex-col gap-2">
        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuário" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="text-[#D3D3D5]">@usuário</span>
            </div>
            <Button 
              variant="outline" 
              className="text-[#D3D3D5] border-[#D3D3D5]" 
              onClick={handleLogout}
            >
              Sair
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              className="text-[#D3D3D5] border-[#D3D3D5]" 
              onClick={handleLogin}
            >
              Entrar
            </Button>
            <Button className="bg-[#93b31f] text-[#5d0d6d]">
              Cadastrar
            </Button>
          </>
        )}
      </div>
    </div>
  )
}