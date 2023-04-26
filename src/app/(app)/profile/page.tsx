import { Metadata } from "next";
import Tabs from "./Tabs";
import Title from "./Title";

export const metadata: Metadata = {
  title: "Thông tin cá nhân",
  description: "Thông tin cá nhân",
};

export default async function UserInfoPage() {
  return (
    <>
      <Title />
      <Tabs />
    </>
  );
}
