export type BaseResponse<T> = {
  success: boolean;
  message: string;
} & T;

export type PaginationResponse<T> = {
  total: number;
  page: number;
  size: number;
  total_pages: number;
} & T;
