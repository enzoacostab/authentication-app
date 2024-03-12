import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from "./auth.config";
import User from "./models/user";
import { connectDb } from "./app/lib/db";
import type { UserType } from "./app/lib/definitions";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";


const getUser = async (userEmail: string): Promise<UserType | null> => {
  try {
    await connectDb()
    const user = await User.findOne({ email: userEmail });
    
    if (!user) return null

    const { name, email, password, phone, photo, bio, _id } = user._doc
    const obj = { 
      id: _id.toString(),
      name: name ?? '',
      email,
      password, 
      bio: bio ?? '',
      phone: phone ?? '',
      photo: photo ?? ''
    }
    return obj
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { 
  handlers: { GET, POST },
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  ...authConfig,
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        let userFound = await getUser(user.email!)
        if (!userFound) {
          let newUser = new User({
            name: user.name,
            email: user.email,
            photo: user.image,
          })
          await newUser.save()
        }
      }
      return true
    },
    async jwt({ token }) {
      const userFound = await getUser(token.email!)

      if (!userFound) return token
      
      token.user = userFound
      return token
    },
    async session({ session, token }) {
      const { image, ...restUser } = session.user
      session.user = { ...restUser, ...token.user as UserType }
      return session
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password!);
          
          if (passwordsMatch) return user
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!
    })
  ]
});
