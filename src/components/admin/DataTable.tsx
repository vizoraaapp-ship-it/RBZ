'use client';
import { useState, useMemo } from 'react';

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
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  filters,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<Extract<keyof T, string> | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Filter
  const filteredData = useMemo(() => {
    if (!query) return data;
    const lowerQ = query.toLowerCase();
    return data.filter((item) => {
      // If searchKeys provided, only check those; else check all columns
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
      
      // Compare strings
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      // Compare numbers
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

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-4 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
            />
          </div>
          {filters && <div className="flex items-center gap-2">{filters}</div>}
        </div>
        <div className="text-sm font-medium text-on-surface-variant shrink-0">
          Total records: {filteredData.length}
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-lowest border-b border-outline-variant/20">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors whitespace-nowrap"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key && (
                      <span className="material-symbols-outlined text-[16px]">
                        {sortAsc ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-outline-variant/10">
            {sortedData.length > 0 ? (
              sortedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-lowest/50 transition-colors group">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-on-surface">
                      {col.render ? col.render(row[col.key], row) : (row[col.key] != null ? String(row[col.key]) : '-')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-on-surface-variant">
                  <div className="flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">inbox</span>
                    <p>No results found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
