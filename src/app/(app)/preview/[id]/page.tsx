import ViewArticle from "@/components/ViewArticle";
import { getDraft } from "@/services/server";
import React from "react";
import Body from "./Body";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xem trước",
  description: "Xem trước",
};

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const draft = await getDraft(id);

  return (
    <>
      <Body />
      <ViewArticle article={draft} />
    </>
  );
}
