'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import DataTable, { Column } from '@/components/admin/DataTable';

interface ContactData {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function AdminContactsPage() {
  const [data, setData] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setData(data);
    }
    setLoading(false);
  };

  const columns: Column<ContactData>[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'subject', label: 'Subject', render: (val) => val || '-' },
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
        <h1 className="text-3xl font-black text-on-surface">Contact Messages</h1>
        <p className="text-on-surface-variant font-medium mt-1">Manage inquiries from the contact form.</p>
      </div>

      <div className="flex-1 min-h-[500px]">
        {loading ? (
          <div className="w-full h-full bg-surface-container-low rounded-3xl animate-pulse" />
        ) : (
          <DataTable 
            data={filteredData} 
            columns={columns} 
            searchPlaceholder="Search by name, email, phone, subject..." 
            searchKeys={['name', 'email', 'phone', 'subject']}
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
