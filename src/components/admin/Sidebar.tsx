'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { adminLogout } from '@/lib/adminAuth';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin/dashboard', icon: 'dashboard' },
  { label: 'Schedule', href: '/admin/dashboard/calendar', icon: 'event' },
  { label: 'Banners', href: '/admin/dashboard/banners', icon: 'view_carousel' },
  { label: 'Bookings', href: '/admin/dashboard/bookings', icon: 'calendar_month' },
  { label: 'Contact Us', href: '/admin/dashboard/contacts', icon: 'forum' },
  { label: 'Careers', href: '/admin/dashboard/careers', icon: 'work' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    adminLogout();
    router.replace('/admin');
  };

  return (
    <motion.aside 
      className={`fixed md:sticky top-0 left-0 z-40 h-screen w-[280px] md:w-64 bg-white border-r border-outline-variant/10 flex flex-col shadow-2xl md:shadow-sm transition-transform duration-300 md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Mobile Close Button */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button 
          onClick={() => setIsOpen(false)}
          className="w-10 h-10 flex items-center justify-center bg-surface-container rounded-xl text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      {/* Brand */}
      <div className="h-24 flex items-center px-8 border-b border-outline-variant/10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="font-black text-on-surface text-xl leading-tight tracking-tight">RBZ Admin</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-black opacity-60">Control Panel</p>
          </div>
        </motion.div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-10 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <Link
                href={item.href}
                className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-xl shadow-primary/20 translate-x-2'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-primary hover:translate-x-2'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-r-full"
                  />
                )}
                <span className={`material-symbols-outlined transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-12'}`}>
                  {item.icon}
                </span>
                <span className="tracking-tight text-sm uppercase font-black">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-6 border-t border-outline-variant/10 bg-surface-container-low/20">
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--error), 0.05)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-error font-black text-sm uppercase tracking-widest transition-colors border border-transparent hover:border-error/10"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          Sign Out
        </motion.button>
      </div>
    </motion.aside>
  );
}
