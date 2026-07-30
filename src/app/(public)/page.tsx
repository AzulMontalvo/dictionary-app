"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FeaturedListCategories, TermSummary, ListSummary } from "@/types";
import { termsApi } from "@/lib/api/terms";
import { listsApi } from "@/lib/api/lists";
import TermCard from "@/components/ui/TermCard";
import ListCard from "@/components/ui/ListCard";
import styles from "./home.module.css";
import { HomeTitle } from "@/lib/utils/homeTitles";
import Link from "next/link";

import {
  SearchIcon,
  CloseIcon,
  BookIcon,
  LibraryIcon,
  GoIcon,
} from "@/components/ui/Icons";

const EMPTY_CATEGORIES: FeaturedListCategories = {
  starter: null,
  weeklyHistory: null,
  selection: null,
  special: null,
};

const LATIN_COLLECTION: ListSummary = {
  id: -1,
  name: "Palabras del Latín",
  description: "Explora los términos con raíces y origen latino.",
  creationDate: new Date().toISOString(),
};

const GREEK_COLLECTION: ListSummary = {
  id: -2,
  name: "Raíces Griegas",
  description: "Colección de vocabulario con etimología griega.",
  creationDate: new Date().toISOString(),
};

export default function HomePage() {
  const router = useRouter();
  const [header, setHeader] = useState("");
  const [dailyWord, setDailyWord] = useState<TermSummary | null>(null);
  const [categories, setCategories] = useState<FeaturedListCategories>(EMPTY_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const fetchHomeData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [featuredLists, word] = await Promise.all([
        listsApi.getFeaturedLists(),
        termsApi.getDailyWord(),
      ]);
      setCategories(featuredLists);
      setDailyWord(word);
    } catch {
      setError("No se pudieron cargar las listas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setHeader(HomeTitle());
    fetchHomeData();
  }, [fetchHomeData]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim())
      router.push(`/terms?query=${encodeURIComponent(query.trim())}`);
  }

  function handleInputClear() {
    setQuery("");
  }

  const hasAnyList = Object.values(categories).some((c) => c !== null);

  return (
    <main className="page-fmob">
      <section className={styles.hero} aria-label="Buscador">
        <h1 className={styles.title}>{header || "Cargando..."}</h1>
        <p className={styles.subtitle}>Busca palabras, definiciones y más</p>

        <form
          onSubmit={handleSearch}
          role="search"
          className={styles.searchContainer}
        >
          <div
            className={`input-wrapper background-light-gray ${styles.searchInputWrapper}`}
          >
            <SearchIcon size={18} />
            <input
              className="query-input"
              type="search"
              placeholder="Escribe para descubrir..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar término"
            />
            {query && (
              <button
                className="clear-search-btn"
                type="button"
                onClick={handleInputClear}
                aria-label="Limpiar búsqueda"
              >
                <CloseIcon size={16} />
              </button>
            )}
          </div>
        </form>
      </section>

      <section
        className={styles.bodyContainer}
        aria-label="Listas destacadas"
        aria-live="polite"
      >
        {/* Todo: replicar skeleton en el resto de páginas */}
        {loading && (
          <div
            className={styles.loader}
            role="status"
            aria-label="Cargando listas destacadas"
          >
            <span className={styles.loaderText}>Cargando...</span>
            <ul className={styles.grid} aria-hidden="true">
              {Array.from({ length: 4 }).map((_, index) => (
                <li className={styles.skeletonCard} key={index}>
                  <span className={styles.skeletonTitle} />
                  <span className={styles.skeletonLine} />
                  <span className={styles.skeletonLineShort} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {!loading && !error && !hasAnyList && (
          <p className={styles.status}>No hay listas disponibles.</p>
        )}

        <ul className={styles.featuredContainer}>
          <li className={`${styles.feature} ${styles.dailyWord}`}>
            <header className={styles.featureTitleContainer}>
              <h2 className={styles.dailyTitle}>Recomendación diaria</h2>
              <BookIcon color="var(--dark-gray)" />
            </header>
            {dailyWord ? <TermCard term={dailyWord} /> : <p>Palabra del día</p>}
          </li>
          {}
          {categories.weeklyHistory && (
            <li className={`${styles.feature} ${styles.weekly}`}>
              <header className={styles.featureTitleContainer}>
                <h2 className={styles.categoryTitle}>Colección semanal</h2>
                <LibraryIcon color="var(--dark-gray)" />
              </header>
              <ListCard list={categories.weeklyHistory} />
            </li>
          )}
        </ul>

        <section>
          <header
            className={`${styles.featureTitleContainer} ${styles.featurePadding}`}
          >
            <h2 className={styles.categoryTitle}>Descubre más...</h2>
            <LibraryIcon color="var(--dark-gray)" />
          </header>
          <ul className={styles.featuredContainerGrid}>
            {categories.starter && (
              <li className={`${styles.feature} ${styles.starter}`}>
                <ListCard list={categories.starter} />
              </li>
            )}
            {categories.selection && (
              <li className={`${styles.feature} ${styles.selection}`}>
                <ListCard list={categories.selection} />
              </li>
            )}

            {categories.special && (
              <li className={`${styles.feature} ${styles.special}`}>
                <ListCard list={categories.special} />
              </li>
            )}

            <li className={`${styles.feature} ${styles.seeAll}`}>
              <Link href="/lists">
                Ver todas las colecciones
                <GoIcon size={18} />
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <header
            className={`${styles.featureTitleContainer} ${styles.featurePadding}`}
          >
            <h2 className={styles.categoryTitle}>Etimologías esenciales</h2>
            <LibraryIcon />
          </header>
          <ul className={styles.featuredContainerGrid}>
            <li className={`${styles.feature} ${styles.etymology}`}>
              <ListCard list={LATIN_COLLECTION} />
            </li>
            <li className={`${styles.feature} ${styles.etymology}`}>
              <ListCard list={GREEK_COLLECTION} />
            </li>
          </ul>
        </section>
      </section>
      <section
        className={styles.submission}
        aria-label="Recomienda una palabra"
      >
        <h2>Recomienda una palabra</h2>
        <p>
          ¿Hay un término culto que no encuentras? Proponlo para nuestro
          catálogo
        </p>
        <input
          className={`input-wrapper ${styles.submissionInput}`}
          placeholder="Nueva palabra"
        ></input>
        <Link href="/" className={styles.submissionBtn}>
          Sugerir palabra
        </Link>
      </section>
    </main>
  );
}
