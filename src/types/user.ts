type UserRole = "admin" | "member";

type User = {
  id: number;
  name: string;
  role: UserRole;
};

type UserRequestBody = {
  name?: unknown;
  role?: unknown;
};

export type { User, UserRequestBody, UserRole };
