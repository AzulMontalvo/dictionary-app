'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { TermSummary } from '@/types';
import { termsApi } from '@/lib/api/terms';
import TermCard from '@/components/ui/TermCard';
import styles from './terms.module.css';

import { SearchIcon, CloseIcon, OrderAZIcon } from '@/components/ui/Icons';

export default function HomePage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<number | ''>('');
  const [orderBy, setOrderBy] = useState<'word_asc' | 'word_desc'>('word_asc');
  const [terms, setTerms] = useState<TermSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTerms = useCallback(async (query: string, category: number | '', orderBy: string) => {
    setLoading(true);
    setError(null);
    try {
        const data = await termsApi.getTerms(query.trim() || undefined, category || undefined, orderBy);
      setTerms(data);
    } catch {
      setError('No se pudieron cargar los términos.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial
  useEffect(() => {
    fetchTerms(initialQuery, '', 'word_asc');
  }, []);

  // Debounce búsqueda
  useEffect(() => {
    const timer = setTimeout(() => fetchTerms(query, category, orderBy), 350);
    return () => clearTimeout(timer);
  }, [query, category, orderBy, fetchTerms]);

  function handleInputClear() {
    setQuery('');
  }

  function handleClear() {
    setQuery('');
    setCategory('');
    setOrderBy('word_asc');
  }

    const toggleOrder = () =>
    setOrderBy(prev => prev === 'word_asc' ? 'word_desc' : 'word_asc');

  return (
    <section className="page-fmob">
      <search className={styles.searchContainer}>
        <div className={`input-wrapper background-light-gray ${styles.searchInputWrapper}`}>
          <SearchIcon size={18} />
          <input
            className="query-input"
            type="search"
            placeholder="Escribe para descubrir..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
                {query && (
        <button 
          className="clear-search-btn"
          onClick={handleInputClear}
          aria-label="Limpiar búsqueda"
        >
          <CloseIcon size={16} />
        </button>
      )}
        </div>

        <div className={styles.searchFilters}>
          <div className={`select-wrapper outlined-gray ${styles.categoryWrapper}`}>
            <select name="category" className={styles.searchCategory} value={category} onChange={e => setCategory(e.target.value === '' ? '' : Number(e.target.value))}>
              <option value="">Todas</option>
              <option value={1}>Sustantivo</option>
              <option value={2}>Verbo</option>
              <option value={3}>Adjetivo</option>
              <option value={4}>Adverbio</option>
              <option value={5}>Funcionales</option>
              <option value={6}>Otras</option>
            </select>
          </div>

          <button className="icon-btn outlined-gray" onClick={toggleOrder} aria-label={orderBy === 'word_asc' ? 'Ordenar Z-A' : 'Ordenar A-Z'}>
            <OrderAZIcon size={18} />
          </button>

          <button className={`text-btn ${styles.searchClearBtn}`} onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </search>

      <section className={styles.results} aria-live="polite">
        <span className="results-span">{terms.length} resultados</span>
        {loading && <p className={styles.status}>Cargando...</p>}

        {!loading && error && <p className={styles.error}>{error}</p>}

        {!loading && !error && terms.length === 0 && (
          <p className={styles.status}>
            {query
              ? `Sin resultados para "${query}"`
              : "No hay términos disponibles."}
          </p>
        )}
        

        {!loading && !error && terms.length > 0 && (
          <ul className={styles.termsGrid}>
            {terms.map((term) => (
              <li key={term.id} className={styles.termItem}>
                <TermCard term={term} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}