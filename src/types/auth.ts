export type AuthResponse = {
  token: string;
  username: string;
  role: string;
  roleId: number;
};

export type LoginRequest = {
  username: string;
  password: string;
};