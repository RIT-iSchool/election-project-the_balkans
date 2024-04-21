export type Paginated<T> = {
  totalCount: number;
  data: T[];
  currentPage: number;
  nextPage?: number;
  prevPage?: number;
  hasMore: boolean;
};
