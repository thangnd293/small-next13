import { TItem } from "@/lib/tiptap";
import { Text } from "@chakra-ui/react";
import classnames from "classnames";
import React, { useImperativeHandle } from "react";
import { useEffect, useState } from "react";

interface IProps {
  items: TItem[];
  command: any;
}

const Commands = React.forwardRef(({ items, command }: IProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalItems = items.length;

  useImperativeHandle(
    ref,
    () => {
      return {
        onKeydown,
      };
    },
    [items, selectedIndex]
  );

  useEffect(() => {
    return () => setSelectedIndex(0);
  }, [items]);

  const onKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp") {
      event.stopPropagation();
      upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      event.stopPropagation();
      downHandler();
      return true;
    }

    if (event.key === "Enter") {
      event.stopPropagation();
      enterHandler();
      return true;
    }

    return false;
  };

  const upHandler = () => {
    setSelectedIndex((prev) => (prev + totalItems - 1) % totalItems);
  };

  const downHandler = () => {
    setSelectedIndex((prev) => (prev + 1) % totalItems);
  };

  const enterHandler = () => {
    command(items[selectedIndex]);
  };

  return (
    <div
      className="flex flex-col w-[382px] max-h-[400px] overflow-auto items bg-white shadow-md border border-slate-200 rounded-md"
      onKeyDown={onKeydown}
      autoFocus
    >
      {items.map((item, index) => {
        const isActive = index === selectedIndex;
        return (
          <button
            key={index}
            className={classnames(
              "group flex items-center p-4 hover:bg-slate-50",
              {
                "bg-slate-50": isActive,
                "bg-white": !isActive,
              }
            )}
            onClick={() => command(item)}
          >
            <div
              className={classnames(
                "w-10 h-10 flex items-center justify-center border border-slate-200 mr-3 group-hover:bg-white",
                {
                  "bg-white": isActive,
                  "bg-slate-50": !isActive,
                }
              )}
            >
              {<item.icon className="h-6 w-6" />}
            </div>
            <div className="flex flex-col flex-1 items-start">
              <Text fontSize="md" fontWeight="medium">
                {item.title}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {item.description}
              </Text>
            </div>
          </button>
        );
      })}
    </div>
  );
});

export default Commands;
