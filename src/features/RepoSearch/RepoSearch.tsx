import { ChangeEvent, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRepoSearchQuery } from "../../api";
import searchIcon from "../../assets/icons/search.svg";
import Input from "../../components/Input";
import { MAX_PAGE_NUMBER } from "../../config";
import { debounce, getOptionId } from "../../utils";
import { updateSelectedItem } from "../RepoCard/selectedRepoSlice";
import { ListItem } from "./ListItem";
import {
  selectFocusedOptionIndex,
  selectIsOpen,
  selectPage,
  selectSearchQuery,
  updateFocusedIndex,
  updateIsOpen,
  updateSearchQuery,
  updateToNextPage,
} from "./searchbarSlice";

export default function RepoSearch() {
  const page = useSelector(selectPage);
  const searchQuery = useSelector(selectSearchQuery);
  const focusedOptionIndex = useSelector(selectFocusedOptionIndex);
  const isOpen = useSelector(selectIsOpen);

  const { data, isLoading, isSuccess, isError } = useRepoSearchQuery(
    { searchQuery, page, perPage: page < MAX_PAGE_NUMBER ? 8 : 4 },
    { skip: !searchQuery }
  );
  const dispatch = useDispatch();

  const handleSearchChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchQuery(e.target.value));
    dispatch(updateIsOpen(true));
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isSuccess) return false;
    switch (e.code) {
      case "ArrowDown":
        if (focusedOptionIndex === -1) {
          dispatch(updateFocusedIndex(0));
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
          dispatch(
            updateFocusedIndex(
              focusedOptionIndex === data.items.length - 1
                ? 0
                : focusedOptionIndex + 1
            )
          );
        }
        break;
      case "ArrowUp":
        if (focusedOptionIndex === -1) {
          dispatch(updateFocusedIndex(data.items.length - 1));
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
          dispatch(
            updateFocusedIndex(
              focusedOptionIndex === 0
                ? data.items.length - 1
                : focusedOptionIndex - 1
            )
          );
        }
        break;
      case "Escape":
        dispatch(updateFocusedIndex(-1));
        dispatch(updateIsOpen(false));
        break;
      case "Enter":
        dispatch(updateSelectedItem(data.items[focusedOptionIndex]));
        break;
    }
  };

  return (
    <>
      <div className="w-full relative">
        <img
          src={searchIcon}
          className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2"
        />
        <Input
          type="search"
          placeholder="Search GitHub Repositories"
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {isLoading && "Loading..."}
      {isError && "Something went wrong"}
      {isSuccess && isOpen && (
        <div
          tabIndex={-1}
          className="w-full flex flex-col text-slate-900 border border-black shadow  rounded-md h-60 overflow-y-auto"
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
                key={i.node_id}
                index={index}
                onClick={() => dispatch(updateSelectedItem(i))}
                name={i.full_name}
                description={i.description}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
