import { redirect } from "next/navigation";

export default function index() {
  return redirect("/profile/home");
}
