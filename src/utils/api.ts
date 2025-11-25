import type { PaginationResponse } from "@/models/api";

export const calculatePagination = (lastPage: PaginationResponse<unknown>) => {
  if (lastPage.page === lastPage.total_pages) return undefined;
  return lastPage.page + 1;
};
