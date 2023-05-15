"use client";

import { Link } from "@chakra-ui/next-js";
import React from "react";
import Icons from "./Icons";

export default function LogoBackHome() {
  return (
    <Link href="/">
      <Icons.Logo />
    </Link>
  );
}
