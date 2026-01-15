'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchArtisanById } from "@/lib/features/artisansSlice";
import { ServiceRequestForm } from "@/components/features/ServiceRequestForm";
import { Star, MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ArtisanProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useAppDispatch();
  const { selectedArtisan } = useAppSelector((state) => state.artisans);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchArtisanById(id)).finally(() => setLoading(false));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!selectedArtisan) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-500">Artisan not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="bg-card text-card-foreground rounded-3xl shadow-xl overflow-hidden mb-12 border border-border/50">
        <div className="h-72 w-full relative">
          <Image
            src={selectedArtisan.portfolio[0] || selectedArtisan.avatar}
            alt={selectedArtisan.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="p-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-24 md:-mt-20 relative z-10">
              <div className="relative h-32 w-32 rounded-3xl overflow-hidden border-4 border-card shadow-2xl">
                <Image
                  src={selectedArtisan.avatar}
                  alt={selectedArtisan.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pb-2">
                <h1 className="text-4xl md:text-5xl font-heading font-black text-white md:text-card-foreground tracking-tight drop-shadow-sm md:drop-shadow-none">
                  {selectedArtisan.name}
                </h1>
                <p className="text-lg md:text-xl text-white/90 md:text-muted-foreground font-medium mt-1">
                  {selectedArtisan.trade}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-muted/50 p-2 rounded-2xl border border-border/40">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-card rounded-xl shadow-sm text-yellow-600 font-bold border border-border/20">
                <Star size={18} className="fill-yellow-500 text-yellow-500" />
                <span>{selectedArtisan.rating.toFixed(1)}</span>
              </div>
              <div className={cn(
                "px-4 py-1.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 border shadow-sm",
                selectedArtisan.availability 
                  ? "bg-green-500 text-white border-green-400" 
                  : "bg-red-500 text-white border-red-400"
              )}>
                {selectedArtisan.availability ? <CheckCircle size={14} /> : <XCircle size={14} />}
                {selectedArtisan.availability ? 'Available' : 'Busy'}
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                About the Artisan
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {selectedArtisan.bio}
              </p>
              <div className="flex items-center gap-2 mt-6 text-muted-foreground font-medium">
                <div className="p-2 bg-muted rounded-lg">
                  <MapPin size={20} className="text-primary" />
                </div>
                {selectedArtisan.location}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
               {/* Quick stats or badges could go here */}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Portfolio */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-heading font-black tracking-tight">Gallery</h2>
            <p className="text-muted-foreground font-medium">Showing {selectedArtisan.portfolio.length} projects</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {selectedArtisan.portfolio.map((img, idx) => (
              <div key={idx} className="group relative h-72 rounded-3xl overflow-hidden border border-border/40 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <Image
                  src={img}
                  alt={`Portfolio ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold text-lg">View Project</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Service Form */}
        <div className="relative">
          <div className="sticky top-24">
            <h2 className="text-3xl font-heading font-black mb-8 tracking-tight">Hire Now</h2>
            <ServiceRequestForm artisanId={selectedArtisan.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
