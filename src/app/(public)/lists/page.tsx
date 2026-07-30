'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ListSummary } from '@/types';
import { listsApi } from '@/lib/api/lists';
import ListCard from '@/components/ui/ListCard';
import styles from './lists.module.css';
import { SearchIcon, CloseIcon } from '@/components/ui/Icons';

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
    <section
      className="page-fmob"
      aria-label="Listas destacadas"
      aria-live="polite"
    >
      <header className={styles.header}>
      <h2 className={styles.sectionTitle}>Colecciones de palabras</h2>
      <p className={styles.sectionSubtitle}>Encuentra algo interesante</p>
      <form role="search" className={styles.searchContainer}>
        <div
          className={`input-wrapper background-light-gray ${styles.searchInputWrapper}`}
        >
          <SearchIcon size={18} />
          <input
            className="query-input"
            type="search"
            placeholder="Escribe para descubrir..."
            aria-label="Buscar término"
          />
            <button
              className="clear-search-btn"
              type="button"
              aria-label="Limpiar búsqueda"
            >
              <CloseIcon size={16} />
            </button>
        </div>
      </form>
      </header>

      {/*Todo: skeleton*/}
      {loading && <p className={styles.status}>Cargando...</p>}

      {!loading && error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {!loading && !error && lists.length === 0 && (
        <p className={styles.status}>No hay listas disponibles.</p>
      )}

      {!loading && !error && lists.length > 0 && (
        <ul className={styles.grid}>
          {lists.map((list) => (
            <li key={list.id} className={styles.list}>
              <ListCard list={list} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}