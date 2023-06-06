import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import builKyselyHelpers from "authjs-adapter-sql/kysely";
import SqlAdapter from "authjs-adapter-sql";
import { queryBuilder } from '../../../../lib/planetscale';
const helpers = builKyselyHelpers(queryBuilder, "postgres"); //or postgres

export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  pages: {
    signIn: "/login",
  },
  adapter: SqlAdapter(helpers),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "devel0per1991@outlook.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // helpers.query
        if(credentials?.email !== "devel0per1991@outlook.com" || credentials.password !== "123456") {
          return {
            id: "1",
            name: "GoooIce",
            email: "devel0per1991@outlook.com",
            role: "admin",
            image: "https://avatar.vercel.sh/goooice",
          };
        }

        return {
          id: "1",
          name: "GoooIce",
          email: "devel0per1991@outlook.com",
          role: "user",
          image: "https://avatar.vercel.sh/goooice",
        }
      },
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
