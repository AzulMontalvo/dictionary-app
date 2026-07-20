import Link from 'next/link';
import { ListSummary } from '@/types';
import styles from './ListCard.module.css';

export default function ListCard({ list }: { list: ListSummary }) {
  return (
    <Link href={`/lists/${list.id}`} className={styles.card}>
      <article>
        <header className={styles.header}>
          <h3 className={styles.name}>{list.name}</h3>
          <span className={styles.count}>{list.termCount} palabras</span>
        </header>

        {list.description && (
          <p className={styles.description}>{list.description}</p>
        )}
      </article>
    </Link>
  );
}