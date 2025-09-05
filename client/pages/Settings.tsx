import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Settings(){
  const [currency, setCurrency] = useState('IDR');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Pengaturan</h2>
      <div className="rounded-md border bg-card p-6 space-y-4">
        <div>
          <label className="block text-sm text-muted-foreground">Mata Uang</label>
          <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="mt-1 rounded-md border p-2">
            <option value="IDR">IDR - Indonesian Rupiah</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button variant="destructive" onClick={()=>{ if(confirm('Reset semua data?')){ location.reload(); } }}>Reset Data</Button>
          <Button variant="outline">Simpan Pengaturan</Button>
        </div>
      </div>
    </div>
  );
}
