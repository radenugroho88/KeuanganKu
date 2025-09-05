import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AppLayout() {
  const navItems = [
    { label: "Dasbor", to: "/" },
    { label: "Transaksi", to: "/transactions" },
    { label: "Input Data", to: "/input-data" },
    { label: "Laporan", to: "/reports" },
    { label: "Anggaran", to: "/budgets" },
    { label: "Pengaturan", to: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 dark:from-zinc-950 dark:via-teal-950/20 dark:to-zinc-900">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-zinc-900/50 border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 shadow" />
              <span className="text-lg font-bold tracking-tight">KeuanganKu</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent/30"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/transactions">
              <Button variant="ghost">Tambah Transaksi</Button>
            </Link>
            <Link to="/reports">
              <Button variant="outline">Lihat Laporan</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Outlet />
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} KeuanganKu
      </footer>
    </div>
  );
}
