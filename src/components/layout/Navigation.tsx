import { Calendar, Utensils, Hotel, Landmark } from 'lucide-react'
import { NavItem } from './NavItem'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const navItems = [
    { href: "/reservations", icon: <Calendar size={20} />, label: "Reservas" },
    { href: "/restaurants", icon: <Utensils size={20} />, label: "Restaurantes" },
    { href: "/hotels", icon: <Hotel size={20} />, label: "Hotéis" },
    { href: "/attractions", icon: <Landmark size={20} />, label: "Pontos Turísticos" },
  ]

  return (
    <nav className={className}>
      <ul className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 lg:gap-8">
        {navItems.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </ul>
    </nav>
  )
}
