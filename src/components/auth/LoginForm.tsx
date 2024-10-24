'use client'

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

export function LoginForm() {
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
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-[#5d0d6d]">
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Your email address" 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-[#5d0d6d]">
                Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Your password" 
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button 
          className="w-full bg-[#93b31f] text-white hover:bg-[#7a9519]"
          onClick={() => {
            // Adicionar lógica de login aqui
          }}
        >
          Log In
        </Button>
        <div className="mt-4 text-center">
          <a 
            href="#" 
            className="text-[#5d0d6d] text-sm hover:text-[#93b31f] transition-colors"
          >
            Forgot your password?
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}