'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ListDetail, TermSummary } from '@/types';
import { listsApi } from '@/lib/api/lists';
import { termsApi } from '@/lib/api/terms';
import TermCard from '@/components/ui/TermCard';
import styles from './listDetail.module.css';

import { ReturnIcon } from '@/components/ui/Icons';

interface EtymologyMeta {
  name: string;
  description: string;
  etymology: string;
}

const ETYMOLOGY_MAP: Record<string, EtymologyMeta> = {
  '-1': {
    name: 'Palabras del Latín',
    description: 'Explora los términos con raíces y origen latino.',
    etymology: 'latín',
  },
  '-2': {
    name: 'Raíces Griegas',
    description: 'Colección de vocabulario con etimología griega.',
    etymology: 'griego',
  },
};

export default function PublicListDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [list, setList] = useState<ListDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    setLoading(true);
    setError(null);

    const etymologyInfo = ETYMOLOGY_MAP[id];

    if (etymologyInfo) {
      termsApi.getTermsByEtymology(etymologyInfo.etymology)
        .then((termsData: TermSummary[]) => {
          const termsArray = Array.isArray(termsData) ? termsData : [termsData];

        setList({
          id: Number(id) || -1,
          name: etymologyInfo.name,
          description: etymologyInfo.description,
          termCount: termsArray.length,
          creationDate: new Date().toISOString(),
          terms: termsArray,
        });
      })
      .catch(() => setError('No se pudieron cargar los términos etimológicos.'))
      .finally(() => setLoading(false));
    } else {
      listsApi.getListById(Number(id))
        .then(setList)
        .catch(() => setError('No se pudo cargar la lista.'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p className={styles.status}>Cargando...</p>;
  if (error)   return <p className={styles.error} role="alert">{error}</p>;
  if (!list)   return null;

  return (
    <main className="page-fmob">
      <Link href="/" className={styles.back}>
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