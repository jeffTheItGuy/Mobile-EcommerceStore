export type User = {
  id: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
};
