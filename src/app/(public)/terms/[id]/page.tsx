import { notFound } from "next/navigation";
import { termsApi } from "@/lib/api/terms";
import { categoryLabel } from "@/lib/utils/category";
import { relationLabel } from "@/lib/utils/relation";
import Link from "next/link";
import styles from "./term.module.css";
import SaveButton from "@/components/ui/SaveButton";

import { ReturnIcon } from "@/components/ui/Icons";

// Genera metadata dinámica para SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const term = await termsApi.getPublicTermById(Number(id));
    return {
      title: `${term.word} — Diccionario`,
      description: term.definition,
    };
  } catch {
    return { title: "Término no encontrado" };
  }
}

export default async function TermDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let term;
  try {
    term = await termsApi.getPublicTermById(Number(id));
  } catch (err) {
    console.error("Error: ", err);
    notFound();
  }

  return (
    <article className={`page-fmob ${styles.page}`}>
      <header className={styles.header}>
        <Link href="/terms" className={styles.back}>
          <ReturnIcon />
          <p>Regresar</p>
        </Link>
        <div className={styles.wordContainer}>
          <div>
            <h1 className={styles.word}>{term.word}</h1>
            {term.category !== 0 && (
              <span className="category-tag">
                {categoryLabel(term.category)}
              </span>
            )}
          </div>
          <SaveButton termId={term.id} />
        </div>
      </header>

      {term.etymology && (
        <section className={styles.etymologySection}>
          <h2 className={styles.sectionTitle}>Etimología</h2>
          <p>{term.etymology}</p>
        </section>
      )}

      <section>
        <h2 className={styles.sectionTitle}>Definición</h2>
        <p className={styles.definition}>{term.definition}</p>
        {term.example && (
          <section className={styles.exampleSection}>
            <q>{term.example}</q>
          </section>
        )}
      </section>

      {term.extraInformation && (
        <section>
          <h2 className={styles.sectionTitle}>Para saber más...</h2>
          <p className={styles.extra}>{term.extraInformation}</p>
        </section>
      )}

      {term.tags.length > 0 && (
        <section>
          <ul className={styles.tags}>
            {term.tags.map((tag) => (
              <li key={tag} className={`term-tag ${styles.tag}`}>
                {tag}
              </li>
            ))}
          </ul>
        </section>
      )}

      {term.relations.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Relacionados</h2>
          <ul className={`${styles.tags} ${styles.related}`}>
            {term.relations.map((rel) => (
              <li key={rel.relatedTermId}>
                <Link
                  href={`/terms/${rel.relatedTermId}`}
                  className={`outlined-gray ${styles.relation}`}
                >
                  <span className={styles.relationType}>
                    {relationLabel(rel.relationType)}
                  </span>
                  <span className={styles.relatedWord}>
                    {rel.relatedTermWord}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
