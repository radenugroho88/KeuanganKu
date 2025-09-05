import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type FinanceEntry = {
  id: string;
  date: string; // ISO
  category: string;
  description?: string;
  amount: number;
  type: "income" | "expense";
};

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice?: number;
};

type FinanceContextValue = {
  entries: FinanceEntry[];
  addEntry: (e: Omit<FinanceEntry, "id">) => void;
  removeEntry: (id: string) => void;
  clearEntries: () => void;
  totalsByCategory: Record<string, number>;
  incomes: FinanceEntry[];
  expenses: FinanceEntry[];
  profitLoss: number;
  inventory: InventoryItem[];
  addInventory: (it: Omit<InventoryItem, "id">) => void;
  updateInventory: (id: string, patch: Partial<InventoryItem>) => void;
  removeInventory: (id: string) => void;
};

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);

const STORAGE_KEY = "keuanganku_data_v1";

export const FinanceProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<FinanceEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return parsed.entries ?? [];
    } catch {
      return [];
    }
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return parsed.inventory ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const payload = { entries, inventory };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [entries, inventory]);

  const addEntry = (e: Omit<FinanceEntry, "id">) => {
    const entry: FinanceEntry = { ...e, id: String(Date.now()) };
    setEntries((s) => [entry, ...s]);
  };

  const removeEntry = (id: string) => setEntries((s) => s.filter((x) => x.id !== id));
  const clearEntries = () => setEntries([]);

  const addInventory = (it: Omit<InventoryItem, "id">) => {
    const item: InventoryItem = { ...it, id: String(Date.now()) };
    setInventory((s) => [item, ...s]);
  };
  const updateInventory = (id: string, patch: Partial<InventoryItem>) =>
    setInventory((s) => s.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const removeInventory = (id: string) => setInventory((s) => s.filter((i) => i.id !== id));

  const incomes = useMemo(() => entries.filter((e) => e.type === "income"), [entries]);
  const expenses = useMemo(() => entries.filter((e) => e.type === "expense"), [entries]);

  const totalsByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    entries.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + (e.type === "income" ? e.amount : e.amount);
    });
    return map;
  }, [entries]);

  const profitLoss = useMemo(() => {
    const totalIncome = incomes.reduce((acc, x) => acc + x.amount, 0);
    const totalExpense = expenses.reduce((acc, x) => acc + x.amount, 0);
    return totalIncome - totalExpense;
  }, [incomes, expenses]);

  return (
    <FinanceContext.Provider
      value={{ entries, addEntry, removeEntry, clearEntries, totalsByCategory, incomes, expenses, profitLoss, inventory, addInventory, updateInventory, removeInventory }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
};
