import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchResults } from "./types";
import { MAX_PAGE_NUMBER } from "./config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  endpoints: (builder) => ({
    repoSearch: builder.query<
      SearchResults,
      { searchQuery: string; page: number; perPage: number }
    >({
      query: ({ searchQuery, page = 1, perPage = 8 }) => {
        return {
          url: "/search/repositories",
          params: {
            q: searchQuery,
            page,
            per_page: perPage,
          },
        };
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.searchQuery;
      },
      merge: (currentCache, newItems) => {
        currentCache.items.push(...newItems.items);
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        if (currentArg?.page && currentArg?.page > MAX_PAGE_NUMBER)
          return false;
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});

export const { useRepoSearchQuery } = api;

export default api;
