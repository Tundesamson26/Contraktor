'use client'
import { SearchFilters } from "@/components/features/SearchFilters";
import { ArtisanList } from "@/components/features/ArtisanList";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ExploreContent() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const trade = searchParams.get('trade') || '';

  return (
    <>
      <SearchFilters />
      <ArtisanList page={page} search={search} trade={trade} />
    </>
  );
}

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore Artisans</h1>
        <p className="text-gray-600">Find skilled professionals for your next project</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ExploreContent />
      </Suspense>
    </div>
  );
}
