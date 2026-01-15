'use client'
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect } from "react";

export function SearchFilters() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || "";
  const trade = searchParams.get('trade') || "";
  const { replace } = useRouter();
  const pathname = usePathname();

  // Save trade filter to localStorage
  useEffect(() => {
    if (trade) {
      localStorage.setItem('contraktor_last_trade_filter', trade);
    }
  }, [trade]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
        params.set('search', term);
    } else {
        params.delete('search');
    }
    params.set('page', '1'); // Reset page
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleTradeChange = (newTrade: string) => {
    const params = new URLSearchParams(searchParams);
     if (newTrade && newTrade !== 'All') {
        params.set('trade', newTrade);
    } else {
        params.delete('trade');
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input 
            type="text" 
            placeholder="Search artisans by name or trade..." 
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue={search}
            onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-48">
        <select 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue={trade}
            onChange={(e) => handleTradeChange(e.target.value)}
        >
            <option value="All">All Trades</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Painter">Painter</option>
        </select>
      </div>
    </div>
  );
}
