'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import StatsCard from '@/components/admin/StatsCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    month: 0,
    total: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'3d' | '7d' | '30d'>('7d');
  const [rawVisitors, setRawVisitors] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setTimeRange('3d');
    }
    fetchAnalytics();
  }, []);

  useEffect(() => {
    processData();
  }, [timeRange, rawVisitors]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('visitors').select('visited_at');
      if (error) throw error;
      setRawVisitors(data || []);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const processData = () => {
    const daysCount = timeRange === '3d' ? 3 : timeRange === '7d' ? 7 : 30;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const chartMap = new Map();
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const name = timeRange === '30d' 
        ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : d.toLocaleDateString('en-US', { weekday: 'short' });
      chartMap.set(d.toDateString(), {
        name: name,
        visitors: 0,
      });
    }

    let countToday = 0;
    let countWeek = 0;
    let countMonth = 0;
    let totalCount = rawVisitors.length;

    rawVisitors.forEach((v) => {
      const visitDate = new Date(v.visited_at);
      const dateStr = new Date(visitDate.getFullYear(), visitDate.getMonth(), visitDate.getDate()).toDateString();
      
      if (visitDate >= today) countToday++;
      if (visitDate >= firstDayOfWeek) countWeek++;
      if (visitDate >= firstDayOfMonth) countMonth++;

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
      total: totalCount,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <div className="space-y-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-black text-on-surface tracking-tight">Dashboard Overview</h1>
        <p className="text-on-surface-variant font-bold mt-2 opacity-60">Analytics and summary of website traffic.</p>
      </motion.div>

      {/* Stats row */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants}><StatsCard title="Visitors Today" value={stats.today} icon="today" loading={loading} /></motion.div>
        <motion.div variants={itemVariants}><StatsCard title="Visitors This Week" value={stats.week} icon="calendar_view_week" loading={loading} /></motion.div>
        <motion.div variants={itemVariants}><StatsCard title="Visitors This Month" value={stats.month} icon="calendar_month" loading={loading} /></motion.div>
        <motion.div variants={itemVariants}><StatsCard title="Total Visitors" value={stats.total} icon="public" loading={loading} /></motion.div>
      </motion.div>

      {/* Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-outline-variant/10 overflow-hidden relative group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-primary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 relative z-10">
          <h2 className="text-xl font-black text-on-surface tracking-tight uppercase tracking-widest text-xs opacity-60">Traffic Analysis</h2>
          
          <div className="flex items-center gap-1 bg-surface-container-low p-1.5 rounded-xl w-full md:w-auto overflow-x-auto custom-scrollbar">
            {(['3d', '7d', '30d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex-1 md:flex-none ${
                  timeRange === range 
                    ? 'bg-white text-primary shadow-sm border border-outline-variant/10' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-black/5'
                }`}
              >
                {range === '3d' ? '3 Days' : range === '7d' ? 'Week' : 'Month'}
              </button>
            ))}
            <motion.button 
              whileHover={{ rotate: 180 }}
              className="w-8 h-8 ml-1 shrink-0 rounded-full flex items-center justify-center text-primary/40 hover:text-primary transition-colors cursor-pointer"
              onClick={fetchAnalytics}
              title="Refresh Data"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
            </motion.button>
          </div>
        </div>
        
        <div className="h-72 md:h-96 w-full relative z-10">
          {loading ? (
            <div className="w-full h-full bg-surface-container-low rounded-3xl animate-pulse" />
          ) : (
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 900, fill: '#64748b' }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 900, fill: '#64748b' }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', padding: '15px' }}
                  labelStyle={{ fontWeight: 900, color: '#1e293b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }}
                  itemStyle={{ fontWeight: 900, color: '#2563eb', fontSize: '14px' }}
                  cursor={{ stroke: '#2563eb', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#2563eb" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorVisitors)" 
                  animationBegin={800}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>
    </div>
  );
}
