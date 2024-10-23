import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="text-center bg-[#D3D3D5] shadow-lg">
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-[#5d0d6d]">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-[rgb(28,57,28)]">{description}</p>
      </CardContent>
    </Card>
  )
}