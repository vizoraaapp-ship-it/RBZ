'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import DataTable, { Column } from '@/components/admin/DataTable';

interface BookingData {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  created_at: string;
}

export default function AdminBookingsPage() {
  const [data, setData] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchBookings();
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
    </div>
  );
}
