import { useMemo } from "react";
import IncomeChart from "@/components/charts/IncomeChart";
import ExpenseChart from "@/components/charts/ExpenseChart";
import { Button } from "@/components/ui/button";
import { downloadCSV, downloadXLSX } from "@/lib/export";

export default function Reports(){
  const pendapatan = useMemo(()=>[
    { bulan: 'Jan', jumlah: 12000000 },
    { bulan: 'Feb', jumlah: 12500000 },
    { bulan: 'Mar', jumlah: 13000000 },
    { bulan: 'Apr', jumlah: 12800000 },
    { bulan: 'Mei', jumlah: 15000000 },
    { bulan: 'Jun', jumlah: 14500000 },
    { bulan: 'Jul', jumlah: 15500000 },
    { bulan: 'Agu', jumlah: 16000000 },
    { bulan: 'Sep', jumlah: 16200000 },
    { bulan: 'Okt', jumlah: 16800000 },
    { bulan: 'Nov', jumlah: 17000000 },
    { bulan: 'Des', jumlah: 18000000 },
  ],[]);

  const pengeluaran = useMemo(()=>[
    { kategori: 'Makan & Minum', jumlah: 3500000 },
    { kategori: 'Transportasi', jumlah: 1200000 },
    { kategori: 'Sewa/Rumah', jumlah: 5000000 },
    { kategori: 'Hiburan', jumlah: 1000000 },
    { kategori: 'Kesehatan', jumlah: 750000 },
    { kategori: 'Belanja', jumlah: 1500000 },
    { kategori: 'Lainnya', jumlah: 800000 },
  ],[]);

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
