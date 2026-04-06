'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import DataTable, { Column } from '@/components/admin/DataTable';

interface CareerData {
  id: string;
  full_name: string;
  age: number;
  phone: string;
  email: string;
  university: string | null;
  college: string | null;
  role: string;
  created_at: string;
}

export default function AdminCareersPage() {
  const [data, setData] = useState<CareerData[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setData(data);
    }
    setLoading(false);
  };

  const columns: Column<CareerData>[] = [
    { key: 'full_name', label: 'Full Name' },
    { key: 'role', label: 'Applied Role' },
    { key: 'age', label: 'Age' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'university', label: 'University', render: (val) => val || '-' },
    { key: 'college', label: 'College', render: (val) => val || '-' },
    { 
      key: 'created_at', 
      label: 'Date Submitted', 
      render: (val) => new Date(val as string).toLocaleString() 
    },
  ];

  // Unique roles for filter dropdown
  const uniqueRoles = Array.from(new Set(data.map((item) => item.role)));

  // Apply role and date filters *before* passing to DataTable
  const filteredData = data.filter((item) => {
    const matchesRole = selectedRole ? item.role === selectedRole : true;
    const matchesDate = filterDate ? item.created_at.startsWith(filterDate) : true;
    return matchesRole && matchesDate;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-on-surface">Career Applications</h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage job applications submitted through the Careers page.</p>
        </div>
        
        {/* Role Filter */}
        <div className="w-full sm:w-64">
          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-outline-variant/30 text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors text-sm font-medium cursor-pointer"
          >
            <option value="">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 min-h-[500px]">
        {loading ? (
          <div className="w-full h-full bg-surface-container-low rounded-3xl animate-pulse" />
        ) : (
          <DataTable 
            data={filteredData} 
            columns={columns} 
            searchPlaceholder="Search by name, email, phone, role..." 
            searchKeys={['full_name', 'email', 'phone', 'role', 'university', 'college']}
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
