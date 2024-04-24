import clsx from "clsx";
import { ComponentProps } from "react";

export default function Input({
  className,
  ...props
}: ComponentProps<"input">) {
  return (
    <input
      className={clsx(
        "h-8 text-sm text-black border border-black bg-white w-full rounded-lg px-2",
        className
      )}
      {...props}
    />
  );
}
