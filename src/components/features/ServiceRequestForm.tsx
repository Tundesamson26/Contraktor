'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { mockApi } from "@/lib/mock-api";
import { CheckCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  clientName: z.string().min(2, "Name must be at least 2 characters"),
  clientEmail: z.string().email("Invalid email address"),
  details: z.string().min(10, "Details must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
});

type FormData = z.infer<typeof formSchema>;

interface ServiceRequestFormProps {
  artisanId: string;
}

export function ServiceRequestForm({ artisanId }: ServiceRequestFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setSuccess(false);
    try {
      await mockApi.submitRequest({ ...data, artisanId });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to submit request", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-muted/40 text-card-foreground rounded-3xl border border-border/50 shadow-sm p-6">
      {success && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-600 font-bold text-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <CheckCircle size={20} className="shrink-0" />
          <span>Request submitted successfully! We'll be in touch soon.</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="clientName" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5 ml-1">
              Your Full Name
            </label>
            <input
              id="clientName"
              type="text"
              {...register("clientName")}
              className="w-full px-4 py-3 bg-muted/30 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-gray-900 transition-all placeholder:text-muted-foreground/40 text-sm"
              placeholder="John Doe"
            />
            {errors.clientName && (
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1.5 ml-1">{errors.clientName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="clientEmail" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5 ml-1">
              Email Address
            </label>
            <input
              id="clientEmail"
              type="email"
              {...register("clientEmail")}
              className="w-full px-4 py-3 bg-muted/30 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-gray-900 transition-all placeholder:text-muted-foreground/40 text-sm"
              placeholder="john@example.com"
            />
            {errors.clientEmail && (
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1.5 ml-1">{errors.clientEmail.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5 ml-1">
              Preferred Date
            </label>
            <input
              id="date"
              type="date"
              {...register("date")}
              className="w-full px-4 py-3 bg-muted/30 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-gray-900 transition-all text-sm"
            />
            {errors.date && (
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1.5 ml-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="details" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5 ml-1">
              Project Details
            </label>
            <textarea
              id="details"
              {...register("details")}
              rows={4}
              className="w-full px-4 py-3 bg-muted/30 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white dark:focus:bg-gray-900 transition-all placeholder:text-muted-foreground/40 text-sm resize-none"
              placeholder="Describe your requirements in detail..."
            />
            {errors.details && (
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1.5 ml-1">{errors.details.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest py-4 px-6 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-xs"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Processing..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
