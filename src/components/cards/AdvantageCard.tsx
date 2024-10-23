interface AdvantageCardProps {
    icon: React.ReactNode
    title: string
    description: string
  }
  
  export function AdvantageCard({ icon, title, description }: AdvantageCardProps) {
    return (
      <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-[#5d0d6d]">{title}</h3>
          <p className="text-[rgb(28,57,28)]">{description}</p>
        </div>
      </div>
    )
  }