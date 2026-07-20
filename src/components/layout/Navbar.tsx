'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import styles from './Navbar.module.css';

import { MenuIcon, CloseIcon, BookIcon, LibraryIcon, MailPlusIcon, BookLockIcon, LoginIcon, LogoutIcon, UserIcon } from '../ui/Icons';

export default function Navbar() {
  const { isAuthenticated, isAdmin, logout, hydrated } = useAuth();
  const router = useRouter();
  
  // 📱 Estado para controlar el menú hamburguesa en mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await authApi.revoke();
    } catch {
      // Si falla el revoke en el servidor, limpiamos igual en el cliente
    } finally {
      logout();
      setIsMenuOpen(false); // Cerramos el menú
      router.push('/');
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand} onClick={closeMenu}>
        VerboCulto
      </Link>

      <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* 🔗 Contenedor de Links (Dinámico según el estado y la resolución) */}
      <div className={`${styles.links} ${isMenuOpen ? styles.linksOpen : ''}`}>
        <Link href="/terms" onClick={closeMenu} className={styles.linkItem}>
          <BookIcon size={18} />
          <span>Términos</span>
        </Link>

        {hydrated && (
          <>
            {/* Rutas de Usuario Regular */}
            {isAuthenticated && !isAdmin && (
              <>
                <Link href="/dashboard/lists" onClick={closeMenu} className={styles.linkItem}>
                  <LibraryIcon size={18} />
                  <span>Colecciones</span>
                </Link>
                <Link href="/dashboard/submissions" onClick={closeMenu} className={styles.linkItem}>
                  <MailPlusIcon size={18} />
                  <span>Sugerencias</span>
                </Link>
              </>
            )}

            {/* Rutas de Administrador */}
            {isAdmin && (
              <>
                <Link href="/admin/terms" onClick={closeMenu} className={styles.linkItem}>
                  <BookLockIcon size={18} />
                  <span>Términos</span>
                </Link>
                <Link href="/admin/submissions" onClick={closeMenu} className={styles.linkItem}>
                  <MailPlusIcon size={18} />
                  <span>Sugerencias</span>
                </Link>
              </>
            )}

            {/* Auth Actions */}
            {isAuthenticated ? (
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <LogoutIcon size={18} />
                <span>Cerrar sesión</span>
              </button>
            ) : (
              <>
                <Link href="/login" onClick={closeMenu} className={styles.linkItem}>
                  <LoginIcon size={18} />
                  <span>Iniciar sesión</span>
                </Link>
                <Link href="/register" onClick={closeMenu} className={styles.linkItem}>
                  <UserIcon size={18} />
                  <span>Registrarse</span>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}