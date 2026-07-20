"useclient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthRequiredModal.module.css";

import { CloseIcon, AuthLockIcon } from "./Icons";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnTo?: string;
  message?: string;
}

export default function AuthRequiredModal({
  isOpen,
  onClose,
  returnTo,
  message = "Necesitas una cuenta para usar esta función",
}: AuthRequiredModalProps) {
  const router = useRouter();

  // Cierra con Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Bloquea scroll del body mientras está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleLogin() {
    const destination = returnTo ? `/login?returnTo=${returnTo}` : "/login";
    router.push(destination);
    onClose();
  }

  function handleRegister() {
    const destination = returnTo
      ? `/register?returnTo=${returnTo}`
      : "/register";
    router.push(destination);
    onClose();
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Cerrar"
        >
          <CloseIcon />
        </button>

        <div className={styles.icon}>
          <AuthLockIcon size={28} />
        </div>

        <h2 id="auth-modal-title" className={styles.title}>
          Inicia sesión para continuar
        </h2>

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button
            className="primary-btn"
            onClick={(e) => {
                e.preventDefault();
              e.stopPropagation();
              handleLogin();
            }}
          >
            Iniciar sesión
          </button>
          <button
            onClick={(e) => {
                e.preventDefault();
              e.stopPropagation();
              handleRegister();
            }}
            className="outlined-btn"
          >
            Crear cuenta
          </button>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className={styles.btnGhost}
        >
          Ahora no
        </button>
      </div>
    </div>
  );
}
