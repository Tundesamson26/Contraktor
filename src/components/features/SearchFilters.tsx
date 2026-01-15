import { Search, ChevronDown, Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function SearchFilters() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || "";
  const trade = searchParams.get('trade') || "All";
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const trades = ["All", "Plumber", "Electrician", "Carpenter", "Painter"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Save trade filter to localStorage
  useEffect(() => {
    if (trade && trade !== 'All') {
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
    params.set('page', '1');
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
    setIsDropdownOpen(false);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-5 mb-12 bg-card/60 backdrop-blur-md p-5 rounded-[2.5rem] border border-border/50 shadow-2xl shadow-primary/5 relative z-50">
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 transition-all group-focus-within:text-primary group-focus-within:scale-110" />
        <input 
            type="text" 
            placeholder="Search by name, trade or skill..." 
            className="w-full pl-12 pr-5 py-4 bg-muted/20 border border-transparent rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:bg-card transition-all placeholder:text-muted-foreground/50 text-base font-medium"
            defaultValue={search}
            onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      
      <div className="relative w-full sm:w-64" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full h-full px-6 py-4 bg-muted/20 border border-transparent rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 focus:bg-card transition-all flex items-center justify-between text-base font-bold text-foreground"
        >
          <span className="truncate">{trade === 'All' ? 'All Categories' : trade}</span>
          <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300", isDropdownOpen && "rotate-180")} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 p-2 bg-card border border-border/60 shadow-2xl shadow-primary/10 rounded-[1.5rem] z-[60] animate-in fade-in zoom-in-95 duration-200">
            {trades.map((t) => (
              <button
                key={t}
                onClick={() => handleTradeChange(t)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl text-left text-sm font-bold flex items-center justify-between transition-all hover:bg-primary/5 hover:text-primary",
                  trade === t ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}
              >
                {t === 'All' ? 'All Categories' : t}
                {trade === t && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
