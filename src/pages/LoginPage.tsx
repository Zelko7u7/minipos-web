import { useState } from "react";
import { useLogin } from "../hooks/useAuth";

type Props = {
  onSuccess: () => void;
};

export default function LoginPage({ onSuccess }: Props) {
  const { mutate, isPending, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { username, password },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded border p-6">
        <h1 className="text-xl font-bold">Iniciar sesión</h1>

        <input
          className="w-full rounded border p-2"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full rounded border p-2"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded bg-black p-2 text-white"
          disabled={isPending}
        >
          {isPending ? "Ingresando..." : "Ingresar"}
        </button>

        {error && <p className="text-sm text-red-500">Credenciales inválidas</p>}
      </form>
    </div>
  );
}