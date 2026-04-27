import type { MenuOption } from "../types/menu";

type Props = {
  items: MenuOption[];
  current: string;
  onChange: (page: string) => void;
  onLogout: () => void;
};

export default function SidebarMenu({ items, current, onChange, onLogout }: Props) {
  return (
    <aside className="w-64 border-r p-4">
      <h2 className="mb-4 text-2xl font-bold">MiniPOS</h2>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.path}>
            <button
              type="button"
              onClick={() => onChange(item.path)}
              className={`w-full rounded px-3 py-2 text-left ${
                current === item.path ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={onLogout}
            className="w-full rounded px-3 py-2 text-left hover:bg-red-100"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </aside>
  );
}