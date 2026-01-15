'use client'
import { useEffect, useState } from "react";

const STORAGE_KEY = 'contraktor_last_trade_filter';

export function useLocalStorage() {
  const [lastTradeFilter, setLastTradeFilter] = useState<string>('');

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setLastTradeFilter(saved);
    }
  }, []);

  const saveTradeFilter = (trade: string) => {
    localStorage.setItem(STORAGE_KEY, trade);
    setLastTradeFilter(trade);
  };

  return { lastTradeFilter, saveTradeFilter };
}
