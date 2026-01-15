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
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-700">
          <CheckCircle size={20} />
          <span>Request submitted successfully!</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium mb-1">
            Your Name *
          </label>
          <input
            id="clientName"
            type="text"
            {...register("clientName")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
          {errors.clientName && (
            <p className="text-red-500 text-xs mt-1">{errors.clientName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="clientEmail" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            id="clientEmail"
            type="email"
            {...register("clientEmail")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="john@example.com"
          />
          {errors.clientEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.clientEmail.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Preferred Date *
          </label>
          <input
            id="date"
            type="date"
            {...register("date")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium mb-1">
            Project Details *
          </label>
          <textarea
            id="details"
            {...register("details")}
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Describe your project requirements..."
          />
          {errors.details && (
            <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
