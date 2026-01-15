'use client'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchArtisans } from "@/lib/features/artisansSlice";
import { ArtisanCard } from "./ArtisanCard";
import { Loader2 } from "lucide-react";

interface ArtisanListProps {
  page: number;
  search?: string;
  trade?: string;
}

export function ArtisanList({ page, search = "", trade = "" }: ArtisanListProps) {
  const dispatch = useAppDispatch();
  const { items, status, total } = useAppSelector((state) => state.artisans);

  useEffect(() => {
    dispatch(fetchArtisans({ page, search, trade }));
  }, [dispatch, page, search, trade]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load artisans. Please try again.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No artisans found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((artisan) => (
          <ArtisanCard key={artisan.id} artisan={artisan} />
        ))}
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        Showing {items.length} of {total} artisans
      </div>
    </div>
  );
}
