import { redirect } from "next/navigation";

import { Response, User } from "@/types/common";

const { API_URL } = process.env;

export async function getUserByToken(token: string) {
  const res = await fetch(`${API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    redirect("/404");
  }

  const data: Response<User> = await res.json();

  return data.data;
}

export async function getUser(username: string) {
  const res = await fetch(`${API_URL}/user/${username}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    redirect("/404");
  }

  const data: Response<User> = await res.json();

  return data.data;
}
