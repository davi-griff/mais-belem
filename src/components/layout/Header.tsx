'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X } from 'lucide-react'
import { Navigation } from './Navigation'
import { Logo } from './Logo'
import { UserActions } from './UserActions'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  return (
    <header className="fixed w-full z-50 bg-[#5d0d6d] text-[#D3D3D5] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Logo />
          <Navigation className="hidden md:flex" />
        </div>
        
        <UserActions 
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          className="hidden md:flex"
        />
        
        <button 
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <MobileMenu 
        isOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </header>
  )
}
