import { LucideIcon } from 'lucide-react'

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
}

export function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <li className="flex-grow md:flex-grow-0">
      <a
        href={href}
        className="flex items-center justify-center md:justify-start gap-1 md:gap-2 py-2 px-2 md:px-3 hover:text-[#93b31f] group hover:scale-105 relative transition-all duration-300 text-sm md:text-base"
      >
        <span className="group-hover:text-[#93b31f] transition-colors duration-300 transform group-hover:scale-110">
          {icon}
        </span>
        <span className="hidden sm:inline">{label}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#93b31f] group-hover:w-full transition-all duration-300" />
      </a>
    </li>
  )
}
