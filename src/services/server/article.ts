import { Article, DataWithPaging, Response } from "@/types/common";
import { JWT } from "next-auth/jwt";

const { API_URL } = process.env;

export async function createDraft(token: JWT) {
  const res = await fetch(`${API_URL}/article/addNewDraft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      title: "",
      content: "",
      status: "DRAFT",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: Response<Article> = await res.json();

  return data.data;
}

export async function getLatestDraft(token: JWT) {
  const res = await fetch(
    `${API_URL}/article/getAllPaging?page=0&size=1&sort=updatedAt%2Cdesc&status=DRAFT`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: Response<DataWithPaging<Article[]>> = await res.json();
  const hasDraft = data.data.content.length > 0;

  if (!hasDraft) {
    const draft = await createDraft(token);
    return draft;
  }
  return data.data.content[0];
}

export async function getDraft(id: string) {
  const res = await fetch(`${API_URL}/article/getDetail?id=${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: Response<Article> = await res.json();

  return data.data;
}

export async function getDrafts() {
  const res = await fetch(
    `${API_URL}/article/getAllPaging?sort=updatedAt%2Cdesc&status=DRAFT`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: Response<DataWithPaging<Article[]>> = await res.json();

  return data.data.content;
}

export async function getArticle(slug: string) {
  const res = await fetch(`${API_URL}/article/getDetail/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: Response<Article> = await res.json();

  return data.data;
}
