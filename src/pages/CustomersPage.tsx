import { useDeferredValue, useMemo, useState } from "react";
import type { Customer } from "../api/customers";
import {
  useCreateCustomer,
  useCustomers,
  useDeleteCustomer,
  useUpdateCustomer,
} from "../api/customers.queries";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

export default function CustomersPage() {
  const { data = [], isLoading, isError, error, refetch } = useCustomers();

  const createMut = useCreateCustomer();
  const updateMut = useUpdateCustomer();
  const deleteMut = useDeleteCustomer();

  const [q, setQ] = useState("");
  const debouncedQ = useDebouncedValue(q, 250);
  const deferredQ = useDeferredValue(debouncedQ);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const filtered = useMemo(() => {
    const term = deferredQ.trim().toLowerCase();
    if (!term) return data;

    return data.filter((c) =>
      `${c.fullName} ${c.email} ${c.phone ?? ""}`
        .toLowerCase()
        .includes(term)
    );
  }, [data, deferredQ]);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();

    await createMut.mutateAsync({
      fullName,
      email,
      phone: phone || undefined,
    });

    setFullName("");
    setEmail("");
    setPhone("");
  }

  function onStartEdit(c: Customer) {
    setEditingId(c.id);
    setEditForm({
      fullName: c.fullName,
      email: c.email,
      phone: c.phone ?? "",
    });
  }

  function onCancelEdit() {
    setEditingId(null);
    setEditForm({
      fullName: "",
      email: "",
      phone: "",
    });
  }

  async function onSaveEdit(id: number) {
    await updateMut.mutateAsync({
      id,
      dto: {
        fullName: editForm.fullName,
        email: editForm.email,
        phone: editForm.phone || undefined,
      },
    });

    onCancelEdit();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">MiniPOS — Customers</h1>
          <button
            className="rounded-lg border px-3 py-2"
            onClick={() => refetch()}
          >
            Reintentar / Refrescar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        <form
          onSubmit={onCreate}
          className="rounded-xl border bg-white p-4 space-y-3"
        >
          <p className="text-sm text-slate-600">
            Crear customer con mutation POST.
          </p>

          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <button
            className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
            disabled={createMut.isPending}
          >
            {createMut.isPending ? "Creando…" : "Crear"}
          </button>

          {createMut.isError && (
            <p className="text-sm text-red-600">
              Error creando: {String(createMut.error)}
            </p>
          )}
        </form>

        <div className="rounded-xl border bg-white p-4">
          <label className="block text-sm font-medium mb-1">Buscar</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nombre, email o teléfono…"
            className="w-full rounded-lg border bg-white px-3 py-2"
          />
          <p className="mt-2 text-sm text-slate-500">
            Debounce + Deferred para mejorar fluidez.
          </p>
        </div>

        <div className="rounded-xl border bg-white">
          <div className="p-4 border-b">
            {isLoading && <p className="text-sm text-slate-600">Cargando…</p>}
            {isError && (
              <p className="text-sm text-red-600">Error: {String(error)}</p>
            )}
            {!isLoading && !isError && (
              <p className="text-sm text-slate-600">
                {filtered.length} registro(s)
              </p>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Teléfono</th>
                  <th className="p-3 w-56">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((c) => {
                  const isEditing = editingId === c.id;

                  return (
                    <tr key={c.id} className="border-t">
                      <td className="p-3">
                        {isEditing ? (
                          <input
                            className="w-full rounded-lg border px-3 py-2"
                            value={editForm.fullName}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                fullName: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          c.fullName
                        )}
                      </td>

                      <td className="p-3">
                        {isEditing ? (
                          <input
                            className="w-full rounded-lg border px-3 py-2"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          c.email
                        )}
                      </td>

                      <td className="p-3">
                        {isEditing ? (
                          <input
                            className="w-full rounded-lg border px-3 py-2"
                            value={editForm.phone}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          c.phone ?? "-"
                        )}
                      </td>

                      <td className="p-3">
                        <div className="flex gap-2">
                          {isEditing ? (
                            <>
                              <button
                                className="rounded-md bg-black px-3 py-1 text-white disabled:opacity-50"
                                disabled={updateMut.isPending}
                                onClick={() => onSaveEdit(c.id)}
                              >
                                {updateMut.isPending ? "Guardando…" : "Guardar"}
                              </button>

                              <button
                                className="rounded-md border px-3 py-1"
                                onClick={onCancelEdit}
                                type="button"
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="rounded-md border px-3 py-1 hover:bg-slate-50"
                                onClick={() => onStartEdit(c)}
                                type="button"
                              >
                                Editar
                              </button>

                              <button
                                className="rounded-md border px-3 py-1 hover:bg-slate-50 disabled:opacity-50"
                                disabled={deleteMut.isPending}
                                onClick={() => {
                                  if (
                                    !confirm(
                                      "¿Seguro que deseas borrar este customer?"
                                    )
                                  )
                                    return;

                                  deleteMut.mutate(c.id);
                                }}
                                type="button"
                              >
                                Borrar
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {!isLoading && !isError && filtered.length === 0 && (
                  <tr>
                    <td className="p-6 text-center text-slate-500" colSpan={4}>
                      No hay registros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {updateMut.isError && (
            <div className="p-4 border-t">
              <p className="text-sm text-red-600">
                Error actualizando: {String(updateMut.error)}
              </p>
            </div>
          )}

          {deleteMut.isError && (
            <div className="p-4 border-t">
              <p className="text-sm text-red-600">
                Error borrando: {String(deleteMut.error)}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}