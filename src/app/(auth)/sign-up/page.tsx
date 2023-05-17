import LogoBackHome from "@/components/LogoBackHome";
import { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Đăng ký tài khoản",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center w-[400px]">
      <LogoBackHome />
      <PageContent />
    </div>
  );
}
