// Admin credentials (hardcoded — in production, use Supabase Auth or env vars)
const ADMIN_USER = 'rbzclimatesolutions';
const ADMIN_PASS = 'rbz06042026';
const AUTH_KEY = 'rbz_admin_auth';

export function adminLogin(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function adminLogout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) === 'true';
}
