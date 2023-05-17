import LogoBackHome from "@/components/LogoBackHome";
import { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center w-[400px]">
      <LogoBackHome />
      <PageContent />
    </div>
  );
}
