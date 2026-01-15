'use client'
import { SearchFilters } from "@/components/features/SearchFilters";
import { ArtisanList } from "@/components/features/ArtisanList";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

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
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="mb-16 relative">
        <div className="absolute -left-4 top-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full -z-10" />
        <h1 className="text-6xl md:text-7xl font-heading font-black mb-6 tracking-tight leading-[0.9]">
          Discover <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">Legendary</span><br /> 
          Artisans Near You
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed font-medium">
          Connect with vetted, top-rated professionals for your home projects. 
          Expertly curated, quality guaranteed.
        </p>
      </div>
      
      <div className="bg-muted/30 rounded-[3rem] p-2 md:p-12 border border-border/50">
        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        }>
          <ExploreContent />
        </Suspense>
      </div>
    </div>
  );
}
