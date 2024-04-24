import { memo } from "react";
import clsx from "clsx";
import { getOptionId } from "../../utils";
import { useSelector } from "react-redux";
import { selectFocusedOptionIndex, updateFocusedIndex } from "./searchbarSlice";
import { useDispatch } from "react-redux";

type Props = {
  index: number;
  name: string;
  description?: string;
  onClick: () => void;
};

const ListItemComponent = ({ index, name, description, onClick }: Props) => {
  const focusedOptionIndex = useSelector(selectFocusedOptionIndex);
  const dispatch = useDispatch();
  const isFocused = index === focusedOptionIndex;

  return (
    <div
      onClick={onClick}
      id={getOptionId(index)}
      role="option"
      className={clsx(
        "hover:text-white hover:bg-black group font-semibold cursor-pointer px-4 py-2 first:rounded-t-md last:rounded-b-md flex gap-8 items-center justify-between",
        isFocused && "text-white bg-black"
      )}
      onMouseEnter={() => dispatch(updateFocusedIndex(index))}
    >
      <span>{name}</span>
      {description ? (
        <span
          className={clsx(
            "text-slate-600 group-hover:text-slate-400 text-sm font-normal inline-block max-w-[50%] truncate",
            isFocused && "!text-slate-400"
          )}
        >
          {description}
        </span>
      ) : null}
    </div>
  );
};

function compareProps(prevProps: Props, currentProps: Props) {
  return prevProps.index === currentProps.index;
}

export const ListItem = memo(ListItemComponent, compareProps);
