'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Column<T> {
  key: Extract<keyof T, string>;
  label: string;
  render?: (value: T[Extract<keyof T, string>], item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKeys?: Extract<keyof T, string>[];
  filters?: React.ReactNode;
  onRowClick?: (item: T) => void;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  filters,
  onRowClick,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<Extract<keyof T, string> | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Filter
  const filteredData = useMemo(() => {
    if (!query) return data;
    const lowerQ = query.toLowerCase();
    return data.filter((item) => {
      const keysToCheck = searchKeys.length > 0 ? searchKeys : columns.map((c) => c.key);
      return keysToCheck.some((k) => {
        const val = item[k];
        return val != null && String(val).toLowerCase().includes(lowerQ);
      });
    });
  }, [data, query, searchKeys, columns]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA == null) return sortAsc ? 1 : -1;
      if (valB == null) return sortAsc ? -1 : 1;
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortAsc]);

  const handleSort = (key: Extract<keyof T, string>) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 }
  };

  return (
    <div className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col h-full transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
      {/* Toolbar */}
      <div className="p-4 md:p-8 border-b border-outline-variant/10 flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-6 bg-surface-container-low/30">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto flex-1">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full sm:w-96"
          >
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-black">
              search
            </span>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-outline-variant/20 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant/40"
            />
          </motion.div>
          {filters && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">{filters}</motion.div>}
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-black text-on-surface-variant/60 uppercase tracking-[0.2em] shrink-0"
        >
          {filteredData.length} Records Found
        </motion.div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto flex-1 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-lowest border-b border-outline-variant/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40 cursor-pointer hover:text-primary transition-colors whitespace-nowrap"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortKey === col.key && (
                      <motion.span 
                        initial={{ rotate: sortAsc ? 0 : 180 }}
                        animate={{ rotate: sortAsc ? 0 : 180 }}
                        className="material-symbols-outlined text-[14px] font-black"
                      >
                        arrow_upward
                      </motion.span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white divide-y divide-outline-variant/5"
          >
            <AnimatePresence mode='popLayout'>
              {sortedData.length > 0 ? (
                sortedData.map((row) => (
                  <motion.tr 
                    key={row.id || JSON.stringify(row)} 
                    variants={rowVariants}
                    layout
                    whileHover={{ backgroundColor: "rgba(var(--primary), 0.02)" }}
                    onClick={() => onRowClick?.(row)}
                    className={`group ${onRowClick ? 'cursor-pointer' : ''}`}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-8 py-5 text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                        {col.render ? col.render(row[col.key], row) : (row[col.key] != null ? String(row[col.key]) : '-')}
                      </td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <motion.tr variants={rowVariants}>
                  <td colSpan={columns.length} className="px-8 py-20 text-center text-on-surface-variant">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <motion.span 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="material-symbols-outlined text-5xl opacity-20"
                      >
                        inbox
                      </motion.span>
                      <p className="font-black uppercase tracking-widest text-xs opacity-50">Empty Archive</p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}
