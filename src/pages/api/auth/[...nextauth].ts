import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = "http://14.225.205.235:8080";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${API_URL}/api/auth/signin`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      const res = await fetch(`${API_URL}/api/user/me`, {
        headers: {
          Authorization: "Bearer " + token.accessToken,
        },
      });

      const { data } = await res.json();

      if (token) {
        session.user = {
          ...token,
          ...data,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect", url, baseUrl);

      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
