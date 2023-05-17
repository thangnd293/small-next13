"use client";

import { Link } from "@chakra-ui/next-js";
import React from "react";
import Icons from "./Icons";

export default function LogoBackHome() {
  return (
    <Link href="/" color="teal.500">
      <Icons.Logo />
    </Link>
  );
}
