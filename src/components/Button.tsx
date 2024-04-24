import clsx from "clsx";
import { ComponentProps } from "react";

export default function Button({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={clsx(
        "border self-end text-sm shadow-sm font-semibold border-black bg-white hover:bg-slate-100 text-slate-900 px-3 py-2 rounded-md",
        className
      )}
      {...props}
    >
      Deploy
    </button>
  );
}
