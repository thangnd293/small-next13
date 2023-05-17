"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Body() {
  const ref = useRef<number>(0);
  useEffect(() => {
    document.body.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";

    //lấy height mỗi 1s nếu height đổi thì bắn event lên parent
    const interval = setInterval(() => {
      const height = document.body.scrollHeight;
      if (height !== ref.current) {
        ref.current = height;
        window.parent.postMessage({ name: "height-event", height }, "*");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return null;
}
