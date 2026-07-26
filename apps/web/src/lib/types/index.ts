export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type WithPagination = {
  page: number;
  pageSize: number;
};

export type WithSoftDelete = {
  deletedAt: Date | null;
};

export type WithTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};
