
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
/** 
 * use @next-auth/prisma-adapter if your next-auth is v4 
 * besides use @auth/prisma-adapter
 * **/
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"



const prisma = new PrismaClient()

const handler =  NextAuth({
  adapter: PrismaAdapter(prisma),
  providers:[
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
  
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  debug: true
})

export {handler as GET, handler as POST}