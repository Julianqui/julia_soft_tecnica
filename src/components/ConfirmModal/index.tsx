import type { FC } from "react";
import { ModalOverlay, ModalContent, ModalActions, ModalButton } from "./styles";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmVariant?: "danger" | "secondary" | "primary";
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  title,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  confirmVariant = "primary",
}) => {
  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <ModalOverlay
      onClick={onCancel}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3 id="modal-title">{title}</h3>
        <ModalActions>
          <ModalButton onClick={onCancel} variant="secondary">
            {cancelText}
          </ModalButton>
          <ModalButton onClick={onConfirm} variant={confirmVariant}>
            {confirmText}
          </ModalButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

