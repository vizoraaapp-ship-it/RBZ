const AUTH_KEY = 'rbz_admin_auth';

// Login: calls API which sets a secure httpOnly cookie
export async function adminLogin(username: string, password: string): Promise<boolean> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      // Also store in localStorage as a belt-and-suspenders client-side flag
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_KEY, 'true');
      }
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// Logout: calls API which clears the cookie
export async function adminLogout(): Promise<void> {
  try {
    await fetch('/api/admin/logout', { method: 'POST' });
  } catch {
    // Ignore
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

// Client-side check (used by AuthGuard as a secondary layer)
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) === 'true';
}
