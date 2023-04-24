import Icons from "@/components/Icons";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center max-w-[420px]">
      <Icons.Logo />
      <h1 className="text-[22px] text-text-primary font-bold">
        Chào mừng trở lại
      </h1>
      <p className=" text-text-secondary">
        Nhập thông tin để truy cập vào Small của bạn
      </p>
      <LoginForm />
    </div>
  );
}
