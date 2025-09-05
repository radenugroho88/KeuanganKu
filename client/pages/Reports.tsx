import { useMemo } from "react";
import IncomeChart from "@/components/charts/IncomeChart";
import ExpenseChart from "@/components/charts/ExpenseChart";
import { Button } from "@/components/ui/button";
import { downloadCSV, downloadXLSX } from "@/lib/export";
import { useFinance } from "@/lib/finance";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

export default function Reports(){
  const { incomes, expenses } = useFinance();

  const pendapatan = useMemo(()=>{
    const map = new Map<string, number>();
    incomes.forEach(i=>{
      const m = new Date(i.date).getMonth();
      const key = MONTH_NAMES[m] || String(m+1);
      map.set(key, (map.get(key)||0) + i.amount);
    });
    return Array.from(map.entries()).map(([bulan,jumlah])=>({bulan,jumlah}));
  },[incomes]);

  const pengeluaran = useMemo(()=>{
    const map = new Map<string, number>();
    expenses.forEach(e=>{
      map.set(e.category, (map.get(e.category)||0) + e.amount);
    });
    return Array.from(map.entries()).map(([kategori,jumlah])=>({kategori,jumlah}));
  },[expenses]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Laporan</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={()=>downloadCSV(pendapatan as any, pengeluaran as any)}>Unduh CSV</Button>
          <Button onClick={()=>downloadXLSX(pendapatan as any, pengeluaran as any)}>Unduh XLSX</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-md border bg-card p-6">
          <h3 className="text-lg font-medium mb-4">Pendapatan per Bulan</h3>
          <IncomeChart data={pendapatan as any} />
        </div>

        <div className="rounded-md border bg-card p-6">
          <h3 className="text-lg font-medium mb-4">Pengeluaran per Kategori</h3>
          <ExpenseChart data={pengeluaran as any} />
        </div>
      </div>
    </div>
  );
}
