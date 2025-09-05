import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Tx = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};

export default function Transactions() {
  const [items, setItems] = useState<Tx[]>(() => {
    return [
      {
        id: "1",
        date: "2025-08-01",
        description: "Gaji Bulanan",
        category: "Pendapatan",
        amount: 15000000,
        type: "income",
      },
      {
        id: "2",
        date: "2025-08-03",
        description: "Belanja bulanan",
        category: "Belanja",
        amount: 1200000,
        type: "expense",
      },
    ];
  });

  const [form, setForm] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
    type: "expense",
  });

  const total = useMemo(
    () => items.reduce((acc, it) => acc + (it.type === "income" ? it.amount : -it.amount), 0),
    [items],
  );

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(form.amount || 0);
    if (!form.date || !form.description || !form.category || !amt) return;
    setItems((s) => [
      ...s,
      { id: String(Date.now()), date: form.date, description: form.description, category: form.category, amount: amt, type: form.type as any },
    ]);
    setForm({ date: "", description: "", category: "", amount: "", type: "expense" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Transaksi</h2>
        <div className="text-sm text-muted-foreground">Saldo: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(total)}</div>
      </div>

      <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
        <div className="md:col-span-1">
          <label className="text-sm text-muted-foreground">Tanggal</label>
          <input type="date" value={form.date} onChange={(e)=>setForm(f=>({...f,date:e.target.value}))} className="mt-1 block w-full rounded-md border p-2" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-muted-foreground">Deskripsi</label>
          <input value={form.description} onChange={(e)=>setForm(f=>({...f,description:e.target.value}))} className="mt-1 block w-full rounded-md border p-2" />
        </div>
        <div className="md:col-span-1">
          <label className="text-sm text-muted-foreground">Kategori</label>
          <input value={form.category} onChange={(e)=>setForm(f=>({...f,category:e.target.value}))} className="mt-1 block w-full rounded-md border p-2" />
        </div>
        <div className="md:col-span-1">
          <label className="text-sm text-muted-foreground">Jumlah</label>
          <input value={form.amount} onChange={(e)=>setForm(f=>({...f,amount:e.target.value}))} className="mt-1 block w-full rounded-md border p-2" />
        </div>
        <div className="md:col-span-1">
          <label className="text-sm text-muted-foreground">Tipe</label>
          <select value={form.type} onChange={(e)=>setForm(f=>({...f,type:e.target.value}))} className="mt-1 block w-full rounded-md border p-2">
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>

        <div className="md:col-span-6">
          <div className="flex gap-2 mt-2">
            <Button type="submit">Tambah Transaksi</Button>
            <Button variant="outline" onClick={()=>{ setItems([]); }}>Kosongkan</Button>
          </div>
        </div>
      </form>

      <div className="overflow-auto rounded-md border bg-card p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th className="p-2">Tanggal</th>
              <th className="p-2">Deskripsi</th>
              <th className="p-2">Kategori</th>
              <th className="p-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t">
                <td className="p-2">{it.date}</td>
                <td className="p-2">{it.description}</td>
                <td className="p-2">{it.category}</td>
                <td className={`p-2 font-medium ${it.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(it.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
