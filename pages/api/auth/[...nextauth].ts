import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "goooice",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        return {
          id: "1",
          name: "GoooIce",
          email: "devel0per1991@outlook.com",
          image: "https://avatar.vercel.sh/goooice",
        }
      },
    })
  ],
};

export default NextAuth(authOptions);
