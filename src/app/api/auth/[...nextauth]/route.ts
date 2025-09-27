import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { User } from '@/lib/types';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (error) {
    return [];
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.id || !credentials?.password) {
          return null;
        }

        const users = await readUsers();
        const user = users.find((user) => user.id === credentials.id);

        if (user && user.password && await bcrypt.compare(credentials.password, user.password)) {
          // Return a user object that NextAuth can use
          return { id: user.id, name: user.id, email: user.email };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };