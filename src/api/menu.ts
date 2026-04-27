import { http } from "./http";
import type { MenuOption } from "../types/menu";

export const menuApi = {
  getByRole: (roleId: number) => http<MenuOption[]>(`/menu/${roleId}`),
};