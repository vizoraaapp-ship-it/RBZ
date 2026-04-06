'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import StatsCard from '@/components/admin/StatsCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    month: 0,
    total: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Fetch all visitors (for a real app, query ranges to avoid heavy loads)
      const { data, error } = await supabase.from('visitors').select('visited_at');
      if (error) throw error;
      
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // Calculate first day of the week (Sunday)
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay());
      
      // Calculate first day of the month
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      let countToday = 0;
      let countWeek = 0;
      let countMonth = 0;

      // Prepare charting data (last 7 days including today)
      const last7DaysCount = new Array(7).fill(0);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      data.forEach((v) => {
        const visitDate = new Date(v.visited_at);
        if (visitDate >= today) countToday++;
        if (visitDate >= firstDayOfWeek) countWeek++;
        if (visitDate >= firstDayOfMonth) countMonth++;

        // For last 7 days chart
        const diffTime = Math.abs(today.getTime() - visitDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if (visitDate <= now && diffDays <= 7 && visitDate >= new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)) {
           // It's within the last 7 days
           const dayIdx = visitDate.getDay();
           // Find relative day (0 = today, 1 = yesterday...)
           // Easier way: map by actual date string
        }
      });

      // Let's generate a proper array for the last 7 days
      const chartMap = new Map();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        chartMap.set(d.toDateString(), {
          name: dayNames[d.getDay()],
          visitors: 0,
        });
      }

      data.forEach((v) => {
        const visitDate = new Date(v.visited_at);
        const dateStr = new Date(visitDate.getFullYear(), visitDate.getMonth(), visitDate.getDate()).toDateString();
        if (chartMap.has(dateStr)) {
          const entry = chartMap.get(dateStr);
          chartMap.set(dateStr, { ...entry, visitors: entry.visitors + 1 });
        }
      });

      setChartData(Array.from(chartMap.values()));

      setStats({
        today: countToday,
        week: countWeek,
        month: countMonth,
        total: data.length,
      });

    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-on-surface">Dashboard Overview</h1>
        <p className="text-on-surface-variant font-medium mt-1">Analytics and summary of website traffic.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Visitors Today" value={stats.today} icon="today" loading={loading} />
        <StatsCard title="Visitors This Week" value={stats.week} icon="calendar_view_week" loading={loading} />
        <StatsCard title="Visitors This Month" value={stats.month} icon="calendar_month" loading={loading} />
        <StatsCard title="Total Visitors" value={stats.total} icon="public" loading={loading} />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-outline-variant/20">
        <h2 className="text-xl font-bold text-on-surface mb-6">Traffic (Last 7 Days)</h2>
        <div className="h-80 w-full">
          {loading ? (
            <div className="w-full h-full bg-surface-container-low rounded-xl animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorVisitors)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
