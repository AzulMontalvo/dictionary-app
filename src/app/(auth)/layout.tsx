import AuthTabs from '@/components/auth/AuthTabs';
import '@/app/globals.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthTabs>
      {children}
    </AuthTabs>
  );
}