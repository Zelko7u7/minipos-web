import type { ReactNode } from "react";
import SidebarMenu from "../components/SidebarMenu";
import { useMenu } from "../hooks/useMenu";
import { useLogout } from "../hooks/useAuth";
import { storage } from "../utils/storage";

type Props = {
  current: string;
  onChange: (page: string) => void;
  content: ReactNode;
};

export default function MainLayout({ current, onChange, content }: Props) {
  const roleId = storage.getRoleId();
  const logout = useLogout();
  const { data: menu = [], isLoading, error } = useMenu(roleId);

  if (isLoading) {
    return <div className="p-4">Cargando menú...</div>;
  }

  if (error) {
    return <div className="p-4">Error cargando menú</div>;
  }

  return (
    <div className="flex min-h-screen">
      <SidebarMenu
        items={menu}
        current={current}
        onChange={onChange}
        onLogout={logout}
      />
      <main className="flex-1 p-4">{content}</main>
    </div>
  );
}