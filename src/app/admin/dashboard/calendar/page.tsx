'use client';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/components/ui/Modal';

interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  service_category: string;
  booking_date: string;
  booking_time: string;
  message: string;
  created_at: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Install: 'bg-red-500',
  Repair: 'bg-blue-500',
  Maintenance: 'bg-yellow-500',
  Opinion: 'bg-black',
};

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();

    // Realtime subscription with logging
    console.log('Initializing Realtime for Calendar...');
    const channel = supabase
      .channel('admin-calendar-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('Calendar Realtime Change:', payload);
          if (payload.eventType === 'INSERT') {
            setBookings((current) => [...current, payload.new as Booking]);
          } else if (payload.eventType === 'DELETE') {
            setBookings((current) => current.filter(item => item.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setBookings((current) => current.map(item => item.id === payload.new.id ? payload.new as Booking : item));
          }
        }
      )
      .subscribe((status) => {
        console.log('Calendar Subscription Status:', status);
      });

    return () => {
      console.log('Cleaning up Calendar Realtime...');
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*');
    if (!error && data) {
      setBookings(data);
    }
    setLoading(false);
  };

  // Calendar logic
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const days = [];
    const totalDays = daysInMonth(year, month);
    const startOffset = firstDayOfMonth(year, month);

    // Empty cells for offset
    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }

    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  }, [year, month]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getBookingsForDay = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    return bookings.filter(b => b.booking_date === dateStr);
  };

  const selectedDayBookings = selectedDay ? getBookingsForDay(selectedDay) : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-on-surface tracking-tight">Scheduled Calendar</h1>
          <p className="text-on-surface-variant font-medium mt-1">Track and manage service appointments visually.</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-outline-variant/10 shadow-sm">
          <button onClick={prevMonth} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-colors text-primary">
            <span className="material-symbols-outlined font-black">chevron_left</span>
          </button>
          <span className="text-sm font-black uppercase tracking-widest px-4 min-w-[160px] text-center">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={nextMonth} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-colors text-primary">
            <span className="material-symbols-outlined font-black">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 bg-surface-container-low/30 p-6 rounded-3xl border border-outline-variant/5">
        <LegendItem color="bg-red-500" label="Install" />
        <LegendItem color="bg-blue-500" label="Repair" />
        <LegendItem color="bg-yellow-500" label="Maintenance" />
        <LegendItem color="bg-black" label="Opinion" />
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-primary/5 border border-outline-variant/10 overflow-hidden">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-outline-variant/10 bg-surface-container-low/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-6 text-center text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 divide-x divide-y divide-outline-variant/5 border-l border-t border-outline-variant/5">
          {calendarDays.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} className="h-32 md:h-40 bg-surface-container-lowest/30" />;
            
            const dayBookings = getBookingsForDay(date);
            const counts = dayBookings.reduce((acc, b) => {
              const cat = b.service_category || 'Other';
              acc[cat] = (acc[cat] || 0) + 1;
              return acc;
            }, {} as Record<string, number>);

            const isToday = new Date().toDateString() === date.toDateString();

            return (
              <motion.div
                key={date.toISOString()}
                whileHover={{ backgroundColor: "rgba(var(--primary), 0.02)" }}
                onClick={() => setSelectedDay(date)}
                className={`h-20 md:h-40 p-1.5 md:p-4 cursor-pointer relative group transition-colors ${isToday ? 'bg-primary/5' : ''}`}
              >
                <span className={`text-[10px] md:text-sm font-black transition-colors ${isToday ? 'text-primary' : 'text-on-surface-variant/60 group-hover:text-primary'}`}>
                  {date.getDate()}
                </span>
                
                <div className="mt-1 md:mt-2 flex flex-wrap md:flex-col gap-0.5 md:gap-1">
                  {Object.entries(counts).map(([cat, count]) => (
                    <div 
                      key={cat} 
                      className={`flex items-center justify-center md:justify-start gap-1 px-1 md:px-2 py-0.5 rounded md:rounded-lg ${CATEGORY_COLORS[cat] || 'bg-gray-400'} text-white text-[8px] md:text-[9px] font-black uppercase tracking-tighter md:tracking-widest min-w-[14px] h-[14px] md:h-auto`}
                    >
                      <span className="hidden md:block truncate">{cat}</span>
                      <span className="md:ml-auto md:bg-white/20 md:px-1 rounded">{count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Day Bookings Modal */}
      <Modal 
        isOpen={!!selectedDay} 
        onClose={() => setSelectedDay(null)}
        title={selectedDay ? `Bookings for ${selectedDay.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}` : ''}
      >
        <div className="space-y-6 py-4">
          {selectedDayBookings.length > 0 ? (
            <div className="space-y-4">
              {selectedDayBookings.map((b) => (
                <button 
                  key={b.id} 
                  onClick={() => setSelectedBooking(b)}
                  className="w-full text-left p-6 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-black text-on-surface group-hover:text-primary transition-colors">{b.full_name}</h4>
                      <p className="text-xs font-bold text-on-surface-variant/60">{b.service_type}</p>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full ${CATEGORY_COLORS[b.service_category] || 'bg-gray-400'} text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-current/10`}>
                      {b.service_category || 'N/A'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-on-surface-variant font-bold">
                      <span className="material-symbols-outlined text-base">schedule</span>
                      {b.booking_time ? b.booking_time.slice(0, 5) : 'Anytime'}
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant font-bold">
                      <span className="material-symbols-outlined text-base">phone</span>
                      {b.phone}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <span className="material-symbols-outlined text-6xl opacity-10 mb-4 block">event_busy</span>
              <p className="text-on-surface-variant font-black uppercase tracking-widest text-sm opacity-50">No Appointments Scheduled</p>
            </div>
          )}
          
          <div className="pt-6 flex justify-end">
            <button 
              onClick={() => setSelectedDay(null)}
              className="px-10 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-dim transition-all active:scale-95 shadow-xl shadow-primary/20"
            >
              Close Calendar View
            </button>
          </div>
        </div>
      </Modal>

      {/* Detailed Booking Modal */}
      <Modal 
        isOpen={!!selectedBooking} 
        onClose={() => setSelectedBooking(null)} 
        title="Detailed Booking Information"
      >
        {selectedBooking && (
          <div className="space-y-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DetailItem label="Full Name" value={selectedBooking.full_name} />
              <DetailItem label="Email Address" value={selectedBooking.email} />
              <DetailItem label="Phone Number" value={selectedBooking.phone} />
              <DetailItem label="Service Type" value={selectedBooking.service_type} />
              <DetailItem label="Service Category" value={selectedBooking.service_category || 'Not specified'} />
              <DetailItem label="Preferred Date" value={selectedBooking.booking_date || 'Not scheduled'} />
              <DetailItem label="Preferred Time" value={selectedBooking.booking_time ? selectedBooking.booking_time.slice(0, 5) : 'Not scheduled'} />
              <DetailItem label="Submitted On" value={new Date(selectedBooking.created_at).toLocaleString()} />
            </div>
            
            <div className="pt-4 border-t border-outline-variant/10">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3 block">Message</label>
              <div className="p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 text-on-surface font-bold leading-relaxed">
                {selectedBooking.message || "No additional message provided."}
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button 
                onClick={() => setSelectedBooking(null)}
                className="px-8 py-3 bg-primary text-white font-black rounded-xl hover:bg-primary-dim transition-all active:scale-95 shadow-lg shadow-primary/20"
              >
                Back to Daily Schedule
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/50 block">{label}</label>
    <p className="text-base font-black text-on-surface">{value}</p>
  </div>
);

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-4 h-4 rounded-full ${color} shadow-sm`} />
    <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant/70">{label}</span>
  </div>
);
