'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './AuthTabs.module.css';

export default function AuthTabs({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  function navigate(path: string) {
    const url = returnTo ? `${path}?returnTo=${returnTo}` : path;
    router.push(url);
  }

  return (
    <section className={styles.container}>
        <Link href="/" className={styles.brand}>
          VerboCulto
        </Link>
      <div className={styles.card}>
        <div className={styles.tabs} role="tablist">
          <button
            role="tab"
            aria-selected={pathname === '/login'}
            className={`${styles.tab} ${pathname === '/login' ? styles.tabActive : ''}`}
            onClick={() => navigate('/login')}
          >
            Entrar
          </button>
          <button
            role="tab"
            aria-selected={pathname === '/register'}
            className={`${styles.tab} ${pathname === '/register' ? styles.tabActive : ''}`}
            onClick={() => navigate('/register')}
          >
            Únete
          </button>
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </section>
  );
}