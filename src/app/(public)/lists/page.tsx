'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ListSummary } from '@/types';
import { listsApi } from '@/lib/api/lists';
import ListCard from '@/components/ui/ListCard';
import styles from './lists.module.css';

export default function HomePage() {
  const router = useRouter();
  const [lists, setLists] = useState<ListSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLists = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listsApi.getAll();
      setLists(data);
    } catch {
      setError('No se pudieron cargar las listas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return (
    <main className={styles.page}>

      <section className={styles.listsSection} aria-label="Listas destacadas" aria-live="polite">
        <h2 className={styles.sectionTitle}>Todas las listas</h2>

        {loading && <p className={styles.status}>Cargando...</p>}

        {!loading && error && (
          <p className={styles.error} role="alert">{error}</p>
        )}

        {!loading && !error && lists.length === 0 && (
          <p className={styles.status}>No hay listas disponibles.</p>
        )}

        {!loading && !error && lists.length > 0 && (
          <ul className={styles.grid}>
            {lists.map(list => (
              <li key={list.id}>
                <ListCard list={list} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}