import { Artisan } from "@/types";
import { Star, MapPin, CheckCircle, XCircle, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArtisanCardProps {
  artisan: Artisan;
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <Link href={`/artisans/${artisan.id}`} className="block group">
      <div className="relative overflow-hidden bg-card text-card-foreground rounded-[2.5rem] border border-border/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
        <div className="h-60 w-full relative overflow-hidden">
           <Image 
             src={artisan.portfolio[0] || artisan.avatar} 
             alt={artisan.name}
             fill
             className="object-cover transition-transform duration-700 group-hover:scale-110"
           />
           <div className="absolute top-4 right-4">
             <div className={cn(
               "px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl backdrop-blur-xl border border-white/20",
               artisan.availability 
                ? "bg-green-500/90 text-white" 
                : "bg-red-500/90 text-white"
             )}>
                <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse bg-white")} />
                {artisan.availability ? "Ready Now" : "Currently Busy"}
             </div>
           </div>
           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5">
              <div className="flex items-center gap-2 text-white">
                <div className="bg-yellow-400 text-black p-1 rounded-lg">
                  <Star size={12} className="fill-current" />
                </div>
                <span className="text-sm font-black tracking-tight">{artisan.rating.toFixed(1)}</span>
              </div>
           </div>
        </div>
        <div className="p-7">
            <div>
               <h3 className="font-heading font-black text-2xl leading-tight group-hover:text-primary transition-colors tracking-tight">
                {artisan.name}
               </h3>
               <div className="inline-flex mt-2 px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl border border-primary/10">
                {artisan.trade}
               </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                    <MapPin size={16} className="text-primary/60" />
                    {artisan.location}
                </div>
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ChevronDown size={18} className="-rotate-90" />
                </div>
            </div>
        </div>
      </div>
    </Link>
  );
}
