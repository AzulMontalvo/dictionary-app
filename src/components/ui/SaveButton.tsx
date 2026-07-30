"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import AuthRequiredModal from "../auth/AuthRequiredModal";
import { SaveIcon } from "./Icons";

interface SaveTermButtonProps {
  termId: number;
  className?: string;
}

export default function SaveButton({ termId }: SaveTermButtonProps) {
  const { isAuthenticated, hydrated } = useAuth();
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

  function handleSave() {
    if (!isAuthenticated) {
      setModalOpen(true);
      return;
    }

    // flujo autenticado
    console.log("guardar término", termId);
  }

  if (!hydrated) return null;

  return (
    <>
      <button
        className="save-btn"
        aria-label="Guardar palabra"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSave();
        }}
      >
        <SaveIcon />
      </button>

      <AuthRequiredModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        returnTo={pathname}
        message="Guarda términos en tus listas personales iniciando sesión."
      />
    </>
  );
}
