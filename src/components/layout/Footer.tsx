import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brandColumn}>
          <span className={styles.brand}>VerboCulto</span>
          <p className={styles.tagline}>
            Un espacio para descubrir, conservar y disfrutar la riqueza de
            nuestro lenguaje.
          </p>
        </div>

        <nav className={styles.navColumn}>
          <span className={styles.columnTitle}>Explora</span>
          <ul className={styles.linkList}>
            <li>
              <Link href="/terms" className={styles.link}>
                Diccionario
              </Link>
            </li>
            <li>
              <Link href="/lists" className={styles.link}>
                Colecciones
              </Link>
            </li>
            {/* <li>
              <Link href="/etymologies" className={styles.link}>
                Etimologías
              </Link>
            </li> */}
            <li>
              <Link href="/daily-word" className={styles.link}>
                Palabra del día
              </Link>
            </li>
          </ul>
        </nav>

        <nav className={styles.navColumn}>
          <span className={styles.columnTitle}>Comunidad</span>
          <ul className={styles.linkList}>
            <li>
              <Link href="/suggest" className={styles.link}>
                Sugerir palabra
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.link}>
                Acerca de VerboCulto
              </Link>
            </li>
          </ul>
        </nav>

        <nav className={styles.navColumn}>
          <span className={styles.columnTitle}>Legales</span>
          <ul className={styles.linkList}>
            <li>
              <Link href="/terms-and-conditions" className={styles.link}>
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className={styles.link}>
                Política de privacidad
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} VerboCulto. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
