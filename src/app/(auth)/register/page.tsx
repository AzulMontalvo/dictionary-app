'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/lib/api/auth';
import styles from './register.module.css';

interface RegisterErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: RegisterErrors = {};

    if (!email.includes('@')) next.email = 'Ingresa un correo válido.';
    if (password.length < 6) next.password = 'La contraseña debe tener al menos 6 caracteres.';
    if (password !== confirm) next.password = 'Las contraseñas no coinciden.';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setErrors({});
    setLoading(true);

    try {
      const data = await authApi.register({ username, email, password });
      login(data);
      router.push('/dashboard/lists');
    } catch (err: unknown) {
      // El backend devuelve { errors: string[] } en registro fallido
      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message);
          if (parsed.errors) {
            setErrors({ general: parsed.errors.join(' ') });
          } else {
            setErrors({ general: err.message });
          }
        } catch {
          setErrors({ general: err.message });
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear cuenta</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => {setEmail(e.target.value); setUserName(e.target.value)}}
              required
              autoComplete="email"
              placeholder="correo@ejemplo.com"
            />
            {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="••••••••"
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="confirm">Confirmar contraseña</label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="••••••••"
            />
          </div>

          {errors.general && <p className={styles.error}>{errors.general}</p>}

          <button type="submit" className={`primary-btn ${styles.button}`} disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <Link href="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}