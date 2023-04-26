import AuthWithAuth0 from "@/components/AuthWithAuth0";
import Icons from "@/components/Icons";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào tài khoản",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center w-[400px]">
      <Icons.Logo />
      <h1 className="text-[22px] text-text-primary font-bold">
        Chào mừng trở lại
      </h1>
      <p className=" text-text-secondary">
        Nhập thông tin để truy cập vào Small của bạn
      </p>
      <LoginForm />
      <AuthWithAuth0 />
    </div>
  );
}
