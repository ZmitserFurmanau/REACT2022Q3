export interface SearchFormProps {
  setQuery: (query: string) => void;
  setSorting: (sort: string) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (num: number) => void;
}
