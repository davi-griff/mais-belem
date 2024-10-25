import NextAuth, { DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authenticateUser } from '@/lib/auth'

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      userType: number;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userType: number;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }
        const user = await authenticateUser(credentials.username, credentials.password)
        if (user) {
          return { ...user, id: user.id.toString() }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.userType = user.user_type // Make sure this matches your user object property
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.userType = token.userType
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
})
