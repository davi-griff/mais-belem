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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RegisterForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, username, password, userType }),
    })

    if (response.ok) {
      router.push('/login') // Redirect to login page after successful registration
    } else {
      const data = await response.json()
      setError(data.message)
    }
  }

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <Leaf className="h-12 w-12 text-[#93b31f]" />
        </div>
        <CardTitle className="text-[#5d0d6d] text-center text-2xl">
          Register for +Belém
        </CardTitle>
        <CardDescription className="text-[rgb(28,57,28)] text-center">
          Create your account for eco-friendly accommodations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName" className="text-[#5d0d6d]">
                First Name
              </Label>
              <Input 
                id="firstName" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name" 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName" className="text-[#5d0d6d]">
                Last Name
              </Label>
              <Input 
                id="lastName" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Your last name" 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username" className="text-[#5d0d6d]">
                Username
              </Label>
              <Input 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username" 
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
                placeholder="Choose a password" 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="userType" className="text-[#5d0d6d]">
                User Type
              </Label>
              <Select onValueChange={setUserType} value={userType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">User</SelectItem>
                  <SelectItem value="1">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button 
            type="submit"
            className="w-full mt-4 bg-[#93b31f] text-white hover:bg-[#7a9519]"
          >
            Register
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <a 
          href="/login" 
          className="text-[#5d0d6d] text-sm hover:text-[#93b31f] transition-colors"
        >
          Already have an account? Log in
        </a>
      </CardFooter>
    </Card>
  )
}
