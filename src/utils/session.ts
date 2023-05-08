import { authOptions } from "@/lib/auth";
import { Session, getServerSession } from "next-auth";
import { headers } from "next/headers";

export async function getSession(): Promise<Session | null> {
  const cookie = headers().get("cookie") ?? "";

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  try {
    return Object.keys(session).length > 0 ? session : null;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser() {
  // const session = await getServerSession(authOptions);
  const session = await getSession();

  return session?.user;
}
