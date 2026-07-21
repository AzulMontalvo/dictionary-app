"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FeaturedListCategories, TermSummary } from "@/types";
import { termsApi } from "@/lib/api/terms";
import { listsApi } from "@/lib/api/lists";
import TermCard from "@/components/ui/TermCard";
import ListCard from "@/components/ui/ListCard";
import styles from "./home.module.css";
import { HomeTitle } from "@/lib/utils/homeTitles";

import {
  SearchIcon,
  CloseIcon,
  BookIcon,
  LibraryIcon,
  StarIcon
} from "@/components/ui/Icons";
import Link from "next/link";

const header = HomeTitle();

const EMPTY_CATEGORIES: FeaturedListCategories = {
  starter: null,
  weeklyHistory: null,
  selection: null,
  special: null,
};

export default function HomePage() {
  const router = useRouter();
  const [dailyWord, setDailyWord] = useState<TermSummary | null>(null);
  const [categories, setCategories] =
    useState<FeaturedListCategories>(EMPTY_CATEGORIES);
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
    <main className="page">
      <section className={styles.hero} aria-label="Buscador">
        <h1 className={styles.title}>{header}</h1>
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
        <div>
          <header className={`${styles.featureTitleContainer} ${styles.featurePadding}`}>
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
                {/* <StarIcon size={100} color="none" fill="var(--primary-soft)" className={styles.specialIcon}/> */}
                <ListCard list={categories.special} />
              </li>
            )}
          </ul>
        </div>
        {/* Todo: Aquí falta la  sección de otras categorías sección tres 3*/}
      </section>
    </main>
  );
}
