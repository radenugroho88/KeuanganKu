import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IncomeChart, { IncomeDatum } from "@/components/charts/IncomeChart";
import ExpenseChart, { ExpenseDatum } from "@/components/charts/ExpenseChart";
import { Button } from "@/components/ui/button";
import { downloadCSV, downloadXLSX } from "@/lib/export";
import { useMemo } from "react";

export default function Index() {
  const pendapatan: IncomeDatum[] = useMemo(
    () => [
      { bulan: "Jan", jumlah: 12000000 },
      { bulan: "Feb", jumlah: 12500000 },
      { bulan: "Mar", jumlah: 13000000 },
      { bulan: "Apr", jumlah: 12800000 },
      { bulan: "Mei", jumlah: 15000000 },
      { bulan: "Jun", jumlah: 14500000 },
      { bulan: "Jul", jumlah: 15500000 },
      { bulan: "Agu", jumlah: 16000000 },
      { bulan: "Sep", jumlah: 16200000 },
      { bulan: "Okt", jumlah: 16800000 },
      { bulan: "Nov", jumlah: 17000000 },
      { bulan: "Des", jumlah: 18000000 },
    ],
    [],
  );

  const pengeluaran: ExpenseDatum[] = useMemo(
    () => [
      { kategori: "Makan & Minum", jumlah: 3500000 },
      { kategori: "Transportasi", jumlah: 1200000 },
      { kategori: "Sewa/Rumah", jumlah: 5000000 },
      { kategori: "Hiburan", jumlah: 1000000 },
      { kategori: "Kesehatan", jumlah: 750000 },
      { kategori: "Belanja", jumlah: 1500000 },
      { kategori: "Lainnya", jumlah: 800000 },
    ],
    [],
  );

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
            <IncomeChart data={pendapatan} />
          </CardContent>
        </Card>

        <Card className="backdrop-blur bg-white/70 dark:bg-zinc-900/70">
          <CardHeader>
            <CardTitle>Pengeluaran per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseChart data={pengeluaran} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
