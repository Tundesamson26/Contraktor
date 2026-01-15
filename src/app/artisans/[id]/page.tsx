'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchArtisanById } from "@/lib/features/artisansSlice";
import { ServiceRequestForm } from "@/components/features/ServiceRequestForm";
import { Star, MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Image from "next/image";

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
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="h-64 w-full relative bg-gradient-to-r from-blue-500 to-purple-600">
          <Image
            src={selectedArtisan.portfolio[0] || selectedArtisan.avatar}
            alt={selectedArtisan.name}
            fill
            className="object-cover opacity-80"
          />
        </div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white -mt-16">
                <Image
                  src={selectedArtisan.avatar}
                  alt={selectedArtisan.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-2">
                <h1 className="text-3xl font-bold">{selectedArtisan.name}</h1>
                <p className="text-lg text-gray-600">{selectedArtisan.trade}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold">{selectedArtisan.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin size={16} />
                    {selectedArtisan.location}
                  </div>
                  <div className={`flex items-center gap-1 ${selectedArtisan.availability ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedArtisan.availability ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {selectedArtisan.availability ? 'Available' : 'Busy'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-600">{selectedArtisan.bio}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Portfolio */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedArtisan.portfolio.map((img, idx) => (
              <div key={idx} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={img}
                  alt={`Portfolio ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Request Service Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Request Service</h2>
          <ServiceRequestForm artisanId={selectedArtisan.id} />
        </div>
      </div>
    </div>
  );
}
