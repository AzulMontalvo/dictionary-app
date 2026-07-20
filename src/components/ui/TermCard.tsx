import Link from "next/link";
import { TermSummary } from "@/types";
import { categoryLabel } from "@/lib/utils/category";
// import { handleSave } from '@/lib/utils/saveTerm';
import styles from "./TermCard.module.css";

import SaveButton from "@/components/ui/SaveButton"

export default function TermCard({ term }: { term: TermSummary }) {
  return (
    <Link href={`/terms/${term.id}`} className={styles.card}>
      <div className={styles.header}>
        <span className={styles.word}>{term.word}</span>
        <div className={styles.rightWrapper}>
          <span className="category-tag">
            {categoryLabel(term.category)}
          </span>
          <SaveButton termId={term.id}/>
        </div>
      </div>
      <p className={styles.definition}>{term.definition}</p>
    </Link>
  );
}
