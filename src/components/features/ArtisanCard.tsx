import { Artisan } from "@/types";
import { Star, MapPin, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArtisanCardProps {
  artisan: Artisan;
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <Link href={`/artisans/${artisan.id}`} className="block group">
      <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
        <div className="h-48 w-full relative bg-gray-100">
           {/* Fallback or real image */}
           <Image 
             src={artisan.portfolio[0] || artisan.avatar} 
             alt={artisan.name}
             fill
             className="object-cover group-hover:scale-105 transition-transform duration-300"
           />
           <div className="absolute top-2 right-2">
             <span className={cn(
               "px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1",
               artisan.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
             )}>
                {artisan.availability ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {artisan.availability ? "Available" : "Busy"}
             </span>
           </div>
        </div>
        <div className="p-4">
            <div className="flex justify-between items-start">
                <div>
                   <h3 className="font-bold text-lg">{artisan.name}</h3>
                   <p className="text-sm text-gray-500">{artisan.trade}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700 text-xs font-bold">
                    <Star size={12} fill="currentColor" />
                    {artisan.rating.toFixed(1)}
                </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm text-gray-400">
                <MapPin size={14} />
                {artisan.location}
            </div>
        </div>
      </div>
    </Link>
  );
}
