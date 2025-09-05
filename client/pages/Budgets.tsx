import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Budgets(){
  const [budgets, setBudgets] = useState(()=>[
    { id: 'b1', kategori: 'Makan & Minum', limit: 4000000, used: 3500000 },
    { id: 'b2', kategori: 'Transportasi', limit: 1500000, used: 1200000 },
    { id: 'b3', kategori: 'Belanja', limit: 2000000, used: 800000 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Anggaran</h2>
        <Button variant="outline" onClick={()=>setBudgets(b=>[...b,{id:Date.now().toString(),kategori:'Baru',limit:1000000,used:0}])}>Tambah Anggaran</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {budgets.map(b=>{
          const pct = Math.min(100, Math.round((b.used / b.limit) * 100));
          return (
            <div key={b.id} className="rounded-md border bg-card p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-medium">{b.kategori}</div>
                  <div className="text-sm text-muted-foreground">{new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(b.used)} used of {new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(b.limit)}</div>
                </div>
                <div className="text-sm font-medium">{pct}%</div>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div style={{width: `${pct}%`}} className={`h-2 rounded-full ${pct>90? 'bg-rose-500' : 'bg-emerald-500'}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
