import type { FC } from "react";
import { useState, useRef } from "react";
import type { Phrase } from "../../types";
import { usePhrases } from "../../context/PhrasesContext";
import { Card, Text, DeleteButton } from "./styles";
import { ConfirmModal } from "../ConfirmModal";
import { useTranslation } from "react-i18next";

interface PhraseCardProps {
  phrase: Phrase;
  onDelete?: (id: string) => void;
}

export const PhraseCard: FC<PhraseCardProps> = ({ phrase, onDelete }) => {
  const { deletePhrase } = usePhrases();
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    deletePhrase(phrase.id);
    setShowConfirm(false);
    
    // Announce to screen readers
    const announcement = document.getElementById("app-announcements");
    if (announcement) {
      announcement.textContent = t("delete.success");
      // Clear after announcement to allow re-announcement
      setTimeout(() => {
        announcement.textContent = "";
      }, 1000);
    }
    
    // Call onDelete callback if provided (for focus management)
    if (onDelete) {
      onDelete(phrase.id);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    // Return focus to delete button
    deleteButtonRef.current?.focus();
  };

  return (
    <>
      <Card ref={cardRef} tabIndex={0} data-phrase-id={phrase.id}>
        <Text>{phrase.text}</Text>
        <DeleteButton
          ref={deleteButtonRef}
          onClick={handleDeleteClick}
          aria-label={t("buttons.delete")}
        >
          ×
        </DeleteButton>
      </Card>
      
      <ConfirmModal
        isOpen={showConfirm}
        title={t("delete.confirm")}
        confirmText={t("buttons.confirm")}
        cancelText={t("buttons.cancel")}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmVariant="primary"
      />
    </>
  );
};
