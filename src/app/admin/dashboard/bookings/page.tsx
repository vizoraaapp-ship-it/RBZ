'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import DataTable, { Column } from '@/components/admin/DataTable';
import Modal from '@/components/ui/Modal';

interface BookingData {
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

export default function AdminBookingsPage() {
  const [data, setData] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);

  useEffect(() => {
    fetchBookings();

    // Realtime subscription with logging
    console.log('Initializing Realtime for Bookings...');
    const channel = supabase
      .channel('admin-bookings-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('Realtime Change Received:', payload);
          if (payload.eventType === 'INSERT') {
            setData((current) => [payload.new as BookingData, ...current]);
          } else if (payload.eventType === 'DELETE') {
            setData((current) => current.filter(item => item.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setData((current) => current.map(item => item.id === payload.new.id ? payload.new as BookingData : item));
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime Subscription Status:', status);
      });

    return () => {
      console.log('Cleaning up Realtime subscription...');
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setData(data);
    }
    setLoading(false);
  };

  const columns: Column<BookingData>[] = [
    { key: 'full_name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'service_type', label: 'Service Type' },
    { key: 'service_category', label: 'Category', render: (val) => val || '-' },
    { key: 'booking_date', label: 'Scheduled Date', render: (val) => val || '-' },
    { key: 'booking_time', label: 'Scheduled Time', render: (val) => val ? val.slice(0, 5) : '-' },
    { key: 'message', label: 'Message', render: (val) => val || '-' },
    { 
      key: 'created_at', 
      label: 'Date Submitted', 
      render: (val) => new Date(val as string).toLocaleString() 
    },
  ];

  const filteredData = filterDate 
    ? data.filter(item => item.created_at.startsWith(filterDate))
    : data;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-black text-on-surface">Bookings</h1>
        <p className="text-on-surface-variant font-medium mt-1">Manage service requests and bookings.</p>
      </div>

      <div className="flex-1 min-h-[500px]">
        {loading ? (
          <div className="w-full h-full bg-surface-container-low rounded-3xl animate-pulse" />
        ) : (
          <DataTable 
            data={filteredData} 
            columns={columns} 
            searchPlaceholder="Search by name, email, phone..." 
            searchKeys={['full_name', 'email', 'phone', 'service_type']}
            onRowClick={(item) => setSelectedBooking(item)}
            filters={
              <input 
                type="date" 
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-4 py-2.5 bg-white border border-outline-variant/30 text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors text-sm font-medium cursor-pointer"
              />
            }
          />
        )}
      </div>

      {/* Detail Modal */}
      <Modal 
        isOpen={!!selectedBooking} 
        onClose={() => setSelectedBooking(null)} 
        title="Booking Details"
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
                Close Details
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
