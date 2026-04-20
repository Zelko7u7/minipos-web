import { useState } from "react";

type Props = {
    current: string;
    onChange: (page: string) => void;
};
export default function SidebarMenu({ current, onChange }: Props) {

    const [menuOptions, setMenuOptions] = useState([
        {
            name: "customers",
            content: "Customers"
        },
        {
            name: "departments",
            content: "Departments"
        },
        {
            name: "TestMenuOptionPage",
            content: "TestMenuOptionPage"
        },
        {
            name: "About",
            content: "About"
        },
        {
            name: "log_out",
            content: "Log Out"
        }
    ]);
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">MiniPOS</h2>
            <nav className="flex flex-col gap-2">
                {
                    menuOptions.map((mo) => (
                        <button
                            key={mo.name}
                            className={`text-left p-2 rounded ${current === mo.name
                                ? "bg-black text-white" : "hover:bg-red-100"}`}
                            onClick={() => onChange(mo.name)}
                        >
                            {mo.content}
                        </button>
                    ))
                }                
            </nav>
        </div>
    );
}   