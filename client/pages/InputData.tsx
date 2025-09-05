import { useState } from "react";
import { useFinance } from "@/lib/finance";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "biaya gaji",
  "biaya pembelian",
  "biaya transport",
  "biaya lain-lain",
  "pendapatan",
  "pengeluaran",
  "neraca labarugi",
  "harga pokok penjualan",
  "stock barang",
  "biaya peralatan",
  "biaya airminum",
  "biaya entertaint",
  "biaya perlengkapan",
  "biaya administrasi bank",
  "biaya bunga lising",
  "biaya bunga pinjaman",
  "claim atau discount",
];

export default function InputData() {
  const { addEntry, entries, inventory, addInventory } = useFinance();
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: CATEGORIES[0],
    description: "",
    amount: "",
    type: "expense",
  });

  const [stockForm, setStockForm] = useState({
    name: "",
    quantity: "",
    unitPrice: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(form.amount || 0);
    if (!form.date || !form.category || !amt) return;
    const type =
      form.type === "income" || form.category === "pendapatan"
        ? "income"
        : "expense";
    addEntry({
      date: form.date,
      category: form.category,
      description: form.description,
      amount: amt,
      type: type as any,
    });
    setForm({ ...form, description: "", amount: "" });
  };

  const addStock = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(stockForm.quantity || 0);
    const up = Number(stockForm.unitPrice || 0);
    if (!stockForm.name || !qty) return;
    addInventory({
      name: stockForm.name,
      quantity: qty,
      unitPrice: up || undefined,
    });
    setStockForm({ name: "", quantity: "", unitPrice: "" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Input Data Akun</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-md border bg-card p-6">
          <h3 className="font-medium mb-4">Masukkan Transaksi / Biaya</h3>
          <form onSubmit={submit} className="grid grid-cols-1 gap-3">
            <label className="text-sm text-muted-foreground">Tanggal</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="rounded-md border p-2"
            />

            <label className="text-sm text-muted-foreground">Kategori</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              className="rounded-md border p-2"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="text-sm text-muted-foreground">Deskripsi</label>
            <input
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="rounded-md border p-2"
            />

            <label className="text-sm text-muted-foreground">
              Jumlah (IDR)
            </label>
            <input
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: e.target.value }))
              }
              className="rounded-md border p-2"
            />

            <label className="text-sm text-muted-foreground">Tipe</label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="rounded-md border p-2"
            >
              <option value="expense">Pengeluaran</option>
              <option value="income">Pendapatan</option>
            </select>

            <div className="flex gap-2 mt-3">
              <Button type="submit">Tambahkan</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setForm({
                    date: new Date().toISOString().slice(0, 10),
                    category: CATEGORIES[0],
                    description: "",
                    amount: "",
                    type: "expense",
                  });
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </div>

        <div className="rounded-md border bg-card p-6">
          <h3 className="font-medium mb-4">Stock / Persediaan</h3>
          <form onSubmit={addStock} className="grid grid-cols-1 gap-3">
            <label className="text-sm text-muted-foreground">Nama Barang</label>
            <input
              value={stockForm.name}
              onChange={(e) =>
                setStockForm((s) => ({ ...s, name: e.target.value }))
              }
              className="rounded-md border p-2"
            />

            <label className="text-sm text-muted-foreground">Kuantitas</label>
            <input
              value={stockForm.quantity}
              onChange={(e) =>
                setStockForm((s) => ({ ...s, quantity: e.target.value }))
              }
              className="rounded-md border p-2"
            />

            <label className="text-sm text-muted-foreground">
              Harga Satuan (opsional)
            </label>
            <input
              value={stockForm.unitPrice}
              onChange={(e) =>
                setStockForm((s) => ({ ...s, unitPrice: e.target.value }))
              }
              className="rounded-md border p-2"
            />

            <div className="flex gap-2 mt-3">
              <Button type="submit">Tambah Stock</Button>
              <Button
                variant="outline"
                onClick={() =>
                  setStockForm({ name: "", quantity: "", unitPrice: "" })
                }
              >
                Reset
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <h4 className="font-medium">Daftar Persediaan</h4>
            <div className="mt-3 space-y-2">
              {inventory.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  Belum ada persediaan
                </div>
              )}
              {inventory.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between border rounded-md p-2"
                >
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {it.quantity} pcs{" "}
                      {it.unitPrice
                        ? "• " +
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(it.unitPrice)
                        : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-card p-6">
        <h3 className="font-medium mb-4">Ringkasan Per Kategori</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(
            entries.reduce(
              (acc, e) => {
                acc[e.category] =
                  (acc[e.category] || 0) +
                  (e.type === "income" ? e.amount : e.amount);
                return acc;
              },
              {} as Record<string, number>,
            ),
          )
            .slice(0, 9)
            .map(([k, v]) => (
              <div key={k} className="rounded-md border bg-white/50 p-3">
                <div className="text-sm text-muted-foreground">{k}</div>
                <div className="font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(v)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
