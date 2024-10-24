import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/layout/Logo"

export function AuthHeader() {
  return (
    <header className="bg-[#5d0d6d] text-[#D3D3D5] p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        <nav className="flex items-center gap-4">
          <Link 
            href="/" 
            className="text-[#D3D3D5] hover:text-[#93b31f] transition-colors"
          >
            Home
          </Link>
          <Button 
            variant="outline" 
            className="text-[#D3D3D5] border-[#D3D3D5] hover:bg-[#93b31f] hover:text-[#5d0d6d]"
          >
            Sign Up
          </Button>
        </nav>
      </div>
    </header>
  )
}