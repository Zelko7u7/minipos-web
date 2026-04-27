import { storage } from "../utils/storage";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = storage.getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}