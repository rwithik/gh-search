import { ChangeEvent, KeyboardEvent, memo } from "react";
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

export default function RepoSearch() {
  const page = useSelector(selectPage);
  const searchQuery = useSelector(selectSearchQuery);

  const { data, isLoading, isSuccess, isError } = useRepoSearchQuery(
    { searchQuery, page, perPage: page < MAX_PAGE_NUMBER ? 8 : 4 },
    { skip: !searchQuery }
  );
  const dispatch = useDispatch();

  const handleSearchChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchQuery(e.target.value));
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.code) {
      case "Down":
    }
  };

  return (
    <>
      {data?.items.length}
      <input
        className="h-8 text-sm w-full rounded-lg px-2"
        placeholder="Search GitHub Repositories"
        onChange={handleSearchChange}
      />
      {isLoading && "Loading..."}
      {isError && "Something went wrong"}
      {isSuccess && (
        <div
          tabIndex={-1}
          className="w-full flex flex-col text-slate-100 border border-white shadow shadow-white rounded-md h-60 overflow-y-auto"
          role="listbox"
          aria-activedescendant="listbox-option"
          onScroll={(e) => {
            if (isLoading || page > MAX_PAGE_NUMBER) return;
            const target = e.target as HTMLDivElement;
            const isScrollEnd =
              target.scrollHeight - target.scrollTop === target.clientHeight;
            if (isScrollEnd) {
              dispatch(updateToNextPage());
            }
          }}
          onKeyDown={handleKeyDown}
        >
          {data.items.map((i) => {
            return (
              <ListItem
                key={i.id}
                onClick={() => dispatch(updateSelectedItem(i))}
                name={i.name}
                description={i.description}
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
    description,
  }: {
    onClick: () => void;
    name: string;
    description?: string;
  }) => {
    return (
      <div
        onClick={onClick}
        id="listbox-option"
        role="option"
        className="hover:text-white hover:bg-slate-900 cursor-pointer px-4 py-2 first:rounded-t-md last:rounded-b-md flex gap-8 items-center justify-between"
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
