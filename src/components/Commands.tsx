import { TItem } from "@/lib/tiptap";
import { Text } from "@chakra-ui/react";
import classnames from "classnames";
import React, {
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

interface IProps {
  items: TItem[];
  command: any;
}

const Commands = React.forwardRef(({ items, command }: IProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalItems = items.length;

  const currentItemActiveRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    return () => setSelectedIndex(0);
  }, [items]);

  const onKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowUp") {
        event.stopPropagation();
        setSelectedIndex((prev) => (prev + totalItems - 1) % totalItems);
        return true;
      }

      if (event.key === "ArrowDown") {
        event.stopPropagation();
        setSelectedIndex((prev) => (prev + 1) % totalItems);
        return true;
      }

      if (event.key === "Enter") {
        event.stopPropagation();

        const selectedItem = items[selectedIndex];

        if (!selectedItem) return false;
        command(items[selectedIndex]);

        return true;
      }

      return false;
    },
    [command, items, selectedIndex, totalItems]
  );

  useEffect(() => {
    currentItemActiveRef.current?.scrollIntoView(false);
  }, [selectedIndex]);

  useImperativeHandle(
    ref,
    () => {
      return {
        onKeydown,
      };
    },
    [onKeydown]
  );

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
            ref={(el) => {
              if (isActive) currentItemActiveRef.current = el;
            }}
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
              {<item.icon className="w-6 h-6" />}
            </div>
            <div className="flex flex-col items-start flex-1">
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

Commands.displayName = "Commands";

export default Commands;
