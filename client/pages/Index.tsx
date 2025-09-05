import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IncomeChart from "@/components/charts/IncomeChart";
import ExpenseChart from "@/components/charts/ExpenseChart";
import { Button } from "@/components/ui/button";
import { downloadCSV, downloadXLSX } from "@/lib/export";
import { useMemo } from "react";
import { useFinance } from "@/lib/finance";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

export default function Index() {
  const { incomes, expenses, profitLoss } = useFinance();

  const pendapatan = useMemo(() => {
    const map = new Map<string, number>();
    incomes.forEach(i => {
      const m = new Date(i.date).getMonth();
      const key = MONTH_NAMES[m] || String(m+1);
      map.set(key, (map.get(key) || 0) + i.amount);
    });
    return Array.from(map.entries()).map(([bulan,jumlah])=>({bulan,jumlah}));
  }, [incomes]);

  const pengeluaran = useMemo(()=>{
    const map = new Map<string, number>();
    expenses.forEach(e=>{
      map.set(e.category, (map.get(e.category)||0) + e.amount);
    });
    return Array.from(map.entries()).map(([kategori,jumlah])=>({kategori,jumlah}));
  },[expenses]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
            Dasbor Keuangan
          </h1>
          <p className="text-muted-foreground mt-1">
            Ringkasan finansial Anda dalam sekejap.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => downloadCSV(pendapatan, pengeluaran)}>
            Unduh CSV
          </Button>
          <Button onClick={() => downloadXLSX(pendapatan, pengeluaran)}>
            Unduh XLSX
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="backdrop-blur bg-white/70 dark:bg-zinc-900/70">
          <CardHeader>
            <CardTitle>Pendapatan per Bulan</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeChart data={pendapatan as any} />
          </CardContent>
        </Card>

        <Card className="backdrop-blur bg-white/70 dark:bg-zinc-900/70">
          <CardHeader>
            <CardTitle>Pengeluaran per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseChart data={pengeluaran as any} />
            <div className="mt-4 font-medium">Laba / Rugi: {new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(profitLoss)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
