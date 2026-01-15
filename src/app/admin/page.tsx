'use client'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAnalytics } from "@/lib/features/adminSlice";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2, TrendingUp, Users, Calendar } from "lucide-react";

export default function AdminPage() {
  const dispatch = useAppDispatch();
  const { analytics, status } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const totalRequests = analytics.reduce((sum, item) => sum + item.count, 0);
  const avgPerDay = analytics.length > 0 ? (totalRequests / analytics.length).toFixed(1) : 0;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-5xl font-heading font-black mb-4 tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Real-time performance metrics and service insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Requests</p>
              <p className="text-4xl font-black font-heading">{totalRequests}</p>
            </div>
            <div className="h-14 w-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              <TrendingUp className="h-7 w-7" />
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Avg per Day</p>
              <p className="text-4xl font-black font-heading">{avgPerDay}</p>
            </div>
            <div className="h-14 w-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center">
              <Calendar className="h-7 w-7" />
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Active Artisans</p>
              <p className="text-4xl font-black font-heading">24</p>
            </div>
            <div className="h-14 w-14 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center">
              <Users className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-card text-card-foreground rounded-3xl border border-border shadow-md p-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-heading font-bold tracking-tight text-foreground">Service Velocity</h2>
          <div className="px-3 py-1 bg-muted rounded-full text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Last 7 Days
          </div>
        </div>
        {status === 'loading' ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip 
                  cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
                <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
