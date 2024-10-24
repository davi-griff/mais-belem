import { LoginForm } from "@/components/auth/LoginForm"
import { AuthHeader } from "@/components/auth/AuthHeader"
import { AuthFooter } from "@/components/auth/AuthFooter"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#D3D3D5] flex flex-col">
      <AuthHeader />
      <main className="flex-grow flex justify-center items-center p-8">
        <LoginForm />
      </main>
      {/* <AuthFooter /> */}
    </div>
  )
}