'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ListDetail } from '@/types';
import { listsApi } from '@/lib/api/lists';
import TermCard from '@/components/ui/TermCard';
import styles from './listDetail.module.css';

import { ReturnIcon } from '@/components/ui/Icons';

export default function PublicListDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [list, setList] = useState<ListDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listsApi.getListById(Number(id))
      .then(setList)
      .catch(() => setError('No se pudo cargar la lista.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className={styles.status}>Cargando...</p>;
  if (error)   return <p className={styles.error} role="alert">{error}</p>;
  if (!list)   return null;

  return (
    <main className="page">
      <Link href="/terms" className={styles.back}>
        <ReturnIcon /><p>Regresar</p>
      </Link>

      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>{list.name}</h1>
          {list.description && (
            <p className={styles.description}>{list.description}</p>
          )}
        </div>
        <span className={styles.count}>{list.termCount} {list.termCount === 1 ? 'palabra' : 'palabras'}</span>
      </header>

      <section aria-label="Términos de la lista">
        {list.terms.length === 0 ? (
          <p className={styles.status}>Esta lista aún no tiene términos.</p>
        ) : (
          <ul className={styles.grid}>
            {list.terms.map((term) => (
              <li key={term.id}>
                <TermCard term={term} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}