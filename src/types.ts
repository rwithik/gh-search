export type SearchResults = {
  incomplete_results: boolean;
  items: Array<{
    description: string;
    full_name: string;
    html_url: string;
    id: number;
    name: string;
    stargazers_count: number;
  }>;
  total_count: number;
};

export type SearchResultItem = SearchResults["items"][number];
