import AuthWithAuth0 from "@/components/AuthWithAuth0";
import LogoBackHome from "@/components/LogoBackHome";
import SignUpForm from "@/components/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Đăng ký tài khoản",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center w-[400px]">
      <LogoBackHome />
      <h1 className="text-[22px] text-text-primary font-bold">Tạo tài khoản</h1>
      <p className=" text-text-secondary">
        Nhập thông tin để tạo Small của bạn
      </p>
      <SignUpForm />
      <AuthWithAuth0 isSignUp />
    </div>
  );
}
