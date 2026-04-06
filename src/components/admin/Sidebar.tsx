'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { adminLogout } from '@/lib/adminAuth';

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin/dashboard', icon: 'dashboard' },
  { label: 'Bookings', href: '/admin/dashboard/bookings', icon: 'calendar_month' },
  { label: 'Contact Us', href: '/admin/dashboard/contacts', icon: 'forum' },
  { label: 'Careers', href: '/admin/dashboard/careers', icon: 'work' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    adminLogout();
    router.replace('/admin');
  };

  return (
    <aside className="w-64 bg-white border-r border-outline-variant/20 flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="font-black text-on-surface text-lg leading-tight">RBZ Admin</h1>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Climate Solutions</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-outline-variant/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-error font-medium hover:bg-error/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
