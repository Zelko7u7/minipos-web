import { useQuery } from "@tanstack/react-query";
import { menuApi } from "../api/menu";
import type { MenuOption } from "../types/menu";

export function useMenu(roleId: number | null) {
  return useQuery<MenuOption[]>({
    queryKey: ["menu", roleId],
    queryFn: () => menuApi.getByRole(roleId as number),
    enabled: !!roleId,
  });
}