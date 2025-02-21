'use client'

import { useState } from 'react'
import { Leaf } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid credentials')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <Leaf className="h-12 w-12 text-[#93b31f]" />
        </div>
        <CardTitle className="text-[#5d0d6d] text-center text-2xl">
          Login to +Belém
        </CardTitle>
        <CardDescription className="text-[rgb(28,57,28)] text-center">
          Access your eco-friendly accommodations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username" className="text-[#5d0d6d]">
                Username
              </Label>
              <Input 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username" 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-[#5d0d6d]">
                Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password" 
              />
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button 
            type="submit"
            className="w-full mt-4 bg-[#93b31f] text-white hover:bg-[#7a9519]"
          >
            Log In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <a 
          href="#" 
          className="text-[#5d0d6d] text-sm hover:text-[#93b31f] transition-colors"
        >
          Forgot your password?
        </a>
      </CardFooter>
    </Card>
  )
}
