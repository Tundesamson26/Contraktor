'use client'

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({ totalItems, itemsPerPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentPage = parseInt(searchParams.get('page') || '1');
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(createPageURL(page));
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pb-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-3 rounded-2xl border border-border bg-card text-card-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={cn(
              "h-11 w-11 rounded-2xl text-sm font-black transition-all",
              currentPage === page
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-3 rounded-2xl border border-border bg-card text-card-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
