"use client";

import { Link } from "@chakra-ui/next-js";
import classNames from "classnames";

type TItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

interface Props {
  items: TItem[];
}

export default function Tabs({ items }: Props) {
  return (
    <div className="space-x-8 border-b border-b-border">
      {items.map((item) => (
        <Link
          key={item.label}
          className={classNames(
            "inline-block py-2 text-sm translate-y-[1px] border-b text-text-primary hover:border-b-text-primary",
            {
              "border-b-text-primary": item.isActive,
              "border-b-transparent": !item.isActive,
            }
          )}
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
