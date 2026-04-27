import { http } from "./http";
import type { AuthResponse, LoginRequest } from "../types/auth";

export const authApi = {
  login: (data: LoginRequest) =>
    http<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};