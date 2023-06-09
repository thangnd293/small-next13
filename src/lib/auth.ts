import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const { API_URL } = process.env;

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
        const res = await fetch(`${API_URL}/auth/signin`, {
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
      const res = await fetch(`${API_URL}/user/me`, {
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });

      const { data } = await res.json();

      const username = data.username || token.name;

      const user = await fetch(`${API_URL}/user/${username}`, {
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }).then((res) => res.json());

      if (token) {
        session.user = {
          ...token,
          ...user.data,
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
  },
  secret: process.env.NEXTAUTH_SECRET,
};
