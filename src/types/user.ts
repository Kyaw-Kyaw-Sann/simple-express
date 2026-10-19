type UserRole = "admin" | "member";
type UserSortField = "id" | "name" | "role";
type SortOrder = "asc" | "desc";

type User = {
  id: number;
  name: string;
  role: UserRole;
};

type UserRequestBody = {
  name?: unknown;
  role?: unknown;
};

type CreateUserBody = {
  name: string;
  role: UserRole;
};

type UpdateUserBody = {
  name?: string;
  role?: UserRole;
};

type UserListQuery = {
  page?: string;
  limit?: string;
  role?: UserRole;
  search?: string;
  sort?: UserSortField;
  order?: SortOrder;
};

export type {
  CreateUserBody,
  SortOrder,
  UpdateUserBody,
  User,
  UserListQuery,
  UserRequestBody,
  UserRole,
  UserSortField
};
