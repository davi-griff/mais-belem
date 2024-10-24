'use client'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserActionsProps {
  isLoggedIn: boolean
  handleLogin: () => void
  handleLogout: () => void
  className?: string
}

export function UserActions({ isLoggedIn, handleLogin, handleLogout, className }: UserActionsProps) {
  if (isLoggedIn) {
    return (
      <div className={`${className} flex items-center gap-4`}>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuário" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Button 
          variant="default" 
          onClick={handleLogout} 
          className="bg-[#93B31F] text-[#5d0d6d] hover:bg-[#93B31F]/90 hover:text-[#D3D3D5]"
        >
          Sair
        </Button>
      </div>
    )
  }

  return (
    <div className={`${className} flex items-center gap-4`}>
      <Button 
        variant="outline" 
        onClick={handleLogin} 
        className="text-[#D3D3D5] border-[#D3D3D5] hover:text-[#93B31F] hover:border-[#93B31F]"
      >
        Entrar
      </Button>
      <Button 
        variant="default" 
        className="bg-[#93B31F] text-[#F0F4F8] hover:bg-[#93B31F]/90 hover:text-white"
      >
        Cadastrar
      </Button>
    </div>
  )
}
