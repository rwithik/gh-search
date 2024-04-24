import { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRepoSearchQuery } from "../../api";
import { MAX_PAGE_NUMBER } from "../../config";
import {
  selectPage,
  selectSearchQuery,
  updateToNextPage,
  updateSearchQuery,
} from "./searchSlice";
import { updateSelectedItem } from "../RepoCard/selectedRepoSlice";
import { debounce } from "../../utils";
import clsx from "clsx";

const getOptionId = (id: number) => {
  return `listbox-option-${id}`;
};

export default function RepoSearch() {
  const page = useSelector(selectPage);
  const searchQuery = useSelector(selectSearchQuery);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isSuccess, isError } = useRepoSearchQuery(
    { searchQuery, page, perPage: page < MAX_PAGE_NUMBER ? 8 : 4 },
    { skip: !searchQuery }
  );
  const dispatch = useDispatch();

  const handleSearchChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchQuery(e.target.value));
    setIsOpen(true);
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isSuccess) return false;
    switch (e.code) {
      case "ArrowDown":
        if (focusedOptionIndex === -1) {
          setFocusedOptionIndex(0);
          document
            .getElementById(getOptionId(0))
            ?.scrollIntoView({ behavior: "smooth" });
        } else {
          document
            .getElementById(
              getOptionId(
                focusedOptionIndex === data.items.length - 1
                  ? 0
                  : focusedOptionIndex + 1
              )
            )
            ?.scrollIntoView({ behavior: "smooth" });
          setFocusedOptionIndex((prev) =>
            prev === data.items.length - 1 ? 0 : prev + 1
          );
        }
        break;
      case "ArrowUp":
        if (focusedOptionIndex === -1) {
          setFocusedOptionIndex(data.items.length - 1);
          document
            .getElementById(getOptionId(data.items.length - 1))
            ?.scrollIntoView({ behavior: "smooth" });
        } else {
          document
            .getElementById(
              getOptionId(
                focusedOptionIndex === 0
                  ? data.items.length - 1
                  : focusedOptionIndex - 1
              )
            )
            ?.scrollIntoView({ behavior: "smooth" });
          setFocusedOptionIndex((prev) =>
            prev === 0 ? data.items.length - 1 : prev - 1
          );
        }
        break;
      case "Esc":
        setFocusedOptionIndex(-1);
        setIsOpen(false);
        break;
      case "Enter":
        dispatch(updateSelectedItem(data.items[focusedOptionIndex]));
        break;
    }
  };

  console.log(focusedOptionIndex);

  return (
    <>
      <input
        className="h-8 text-sm w-full rounded-lg px-2"
        placeholder="Search GitHub Repositories"
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      {isLoading && "Loading..."}
      {isError && "Something went wrong"}
      {isSuccess && isOpen && (
        <div
          tabIndex={-1}
          className="w-full flex flex-col text-slate-100 border border-white shadow shadow-white rounded-md h-60 overflow-y-auto"
          role="listbox"
          aria-activedescendant={
            focusedOptionIndex !== -1
              ? "listbox-option-" + focusedOptionIndex
              : ""
          }
          onScroll={(e) => {
            if (isLoading || page > MAX_PAGE_NUMBER) return;
            const target = e.target as HTMLDivElement;
            const isScrollEnd =
              target.scrollHeight - target.scrollTop === target.clientHeight;
            if (isScrollEnd) {
              dispatch(updateToNextPage());
            }
          }}
        >
          {data.items.map((i, index) => {
            return (
              <ListItem
                isFocused={index === focusedOptionIndex}
                key={i.id}
                id={index}
                onClick={() => dispatch(updateSelectedItem(i))}
                name={i.name}
                description={i.description}
                onFocus={() => setFocusedOptionIndex(index)}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

const ListItem = memo(
  ({
    onClick,
    name,
    id,
    description,
    onFocus,
    isFocused,
  }: {
    onClick: () => void;
    name: string;
    description?: string;
    onFocus: () => void;
    id: number;
    isFocused: boolean;
  }) => {
    return (
      <div
        onClick={onClick}
        id={getOptionId(id)}
        role="option"
        className={clsx(
          "hover:text-white hover:bg-slate-900 cursor-pointer px-4 py-2 first:rounded-t-md last:rounded-b-md flex gap-8 items-center justify-between",
          isFocused && "text-white bg-slate-900"
        )}
        onMouseEnter={onFocus}
      >
        <span>{name}</span>
        {description ? (
          <span className="text-slate-400 inline-block max-w-[50%] truncate">
            {description}
          </span>
        ) : null}
      </div>
    );
  }
);
