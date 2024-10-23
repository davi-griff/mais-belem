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
  return (
    <div className={`items-center gap-4 ${className}`}>
      {isLoggedIn ? (
        <>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuário" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
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
  )
}