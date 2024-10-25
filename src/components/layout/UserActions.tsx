'use client'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

interface UserActionsProps {
  className?: string
}

export function UserActions({ className }: UserActionsProps) {
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleLogin = () => {
    router.push('/login')
  }

  const handleRegister = () => {
    router.push('/register')
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session?.user) {
    return (
      <div className={`${className} flex items-center gap-4`}>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={session.user.name || 'User'} />
          <AvatarFallback>{session.user.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <span className="text-[#D3D3D5]">{session.user.name || session.user.email}</span>
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
        onClick={handleRegister}
        className="bg-[#93B31F] text-[#F0F4F8] hover:bg-[#93B31F]/90 hover:text-white"
      >
        Cadastrar
      </Button>
    </div>
  )
}
