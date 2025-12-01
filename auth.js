import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectToDatabase from "@/lib/connectDB"
import User from "@/models/User"

export const authOptions = {
  debug: process.env.NODE_ENV !== "production",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Basic validation
        if (!credentials?.email || !credentials?.password) {
          console.debug("Authorize failed: Missing email or password", { credentials })
          throw new Error("Please provide both email and password")
        }

        await connectToDatabase()

        const user = await User.findOne({ email: credentials.email })
        if (!user) {
          console.debug("Authorize failed: User not found", { email: credentials.email })
          throw new Error("Invalid email or password")
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          console.debug("Authorize failed: Invalid password for user", { email: credentials.email, user: user.password })
          throw new Error("Invalid email or password")
        }

        // Success
        return { id: user._id.toString(), email: user.email, name: user.name }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const authHandler = NextAuth(authOptions)