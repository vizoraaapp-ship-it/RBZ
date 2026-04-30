import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientLayout from './ClientLayout';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Check auth securely on the server without relying on middleware
  const cookieStore = await cookies();
  const session = cookieStore.get('rbz_admin_session');

  if (!session || session.value !== 'authenticated') {
    redirect('/admin');
  }

  return <ClientLayout>{children}</ClientLayout>;
}
