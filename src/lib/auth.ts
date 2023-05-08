import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const { API_URL } = process.env;

const THIRTY_MINUTES = 30 * 60;
export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    updateAge: THIRTY_MINUTES,
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
        console.log("res", res);

        const user = await res.json();
        console.log("user", user);

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
        },
      });

      const { data } = await res.json();
      const username = data.username || token.name;

      const user = await fetch(`${API_URL}/user/${username}`, {
        headers: {
          Authorization: "Bearer " + token.accessToken,
          "Content-Type": "application/json",
        },
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
