import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { storage } from "../utils/storage";
import type { LoginRequest } from "../types/auth";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      storage.setSession(data);
    },
  });
}

export function useLogout() {
  return () => {
    storage.clearSession();
    window.location.reload();
  };
}