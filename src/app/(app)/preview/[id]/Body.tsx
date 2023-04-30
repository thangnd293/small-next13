"use client";

import { useEffect } from "react";

export default function Body() {
  useEffect(() => {
    document.body.style.pointerEvents = "none";
  }, []);
  return null;
}
