'use client';
import { useState } from 'react';
import AuthGuard from '@/components/admin/AuthGuard';
import Sidebar from '@/components/admin/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-screen bg-surface overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-outline-variant/10 z-20 shrink-0 shadow-sm relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-inner">
                <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
              </div>
              <div>
                <h1 className="font-black text-on-surface text-base leading-tight tracking-tight">RBZ Admin</h1>
                <p className="text-[9px] uppercase tracking-[0.2em] text-on-surface-variant font-black opacity-60">Control Panel</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-xl text-primary hover:bg-surface-container-high transition-colors shadow-sm"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>
          </div>

          <div className="flex-1 overflow-x-hidden overflow-y-auto w-full p-4 md:p-8 scroll-smooth">
            {children}
          </div>
        </main>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </AuthGuard>
  );
}
