import * as XLSX from "xlsx";

export type IncomeItem = { bulan: string; jumlah: number };
export type ExpenseItem = { kategori: string; jumlah: number };

export function downloadCSV(
  incomes: IncomeItem[],
  expenses: ExpenseItem[],
  filename = "keuanganku.csv",
) {
  const incomeHeader = "Pendapatan per Bulan";
  const incomeCols = "Bulan,Jumlah (IDR)";
  const incomeRows = incomes
    .map((r) => `${r.bulan},${r.jumlah.toString()}`)
    .join("\n");

  const expenseHeader = "Pengeluaran per Kategori";
  const expenseCols = "Kategori,Jumlah (IDR)";
  const expenseRows = expenses
    .map((r) => `${r.kategori},${r.jumlah.toString()}`)
    .join("\n");

  const csv = [
    incomeHeader,
    incomeCols,
    incomeRows,
    "",
    expenseHeader,
    expenseCols,
    expenseRows,
  ]
    .filter(Boolean)
    .join("\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadXLSX(
  incomes: IncomeItem[],
  expenses: ExpenseItem[],
  filename = "keuanganku.xlsx",
) {
  const wb = XLSX.utils.book_new();
  const incomeSheet = XLSX.utils.json_to_sheet(
    incomes.map((i) => ({ Bulan: i.bulan, "Jumlah (IDR)": i.jumlah })),
  );
  const expenseSheet = XLSX.utils.json_to_sheet(
    expenses.map((e) => ({ Kategori: e.kategori, "Jumlah (IDR)": e.jumlah })),
  );
  XLSX.utils.book_append_sheet(wb, incomeSheet, "Pendapatan");
  XLSX.utils.book_append_sheet(wb, expenseSheet, "Pengeluaran");
  XLSX.writeFile(wb, filename);
}
