import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { usePhrases } from "../../context/PhrasesContext";
import { Form, Input, Button, ErrorMessage, CharCount } from "./styles";
import { useTranslation } from "react-i18next";

const MIN_PHRASE_LENGTH = 1;
const MAX_PHRASE_LENGTH = 100;

export const PhraseForm: FC = () => {
  const [newPhrase, setNewPhrase] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { addPhrase, originalPhrases } = usePhrases();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input after adding a phrase
    if (newPhrase === "" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newPhrase, originalPhrases]);

  const validatePhrase = (phrase: string): string | null => {
    const trimmed = phrase.trim();
    if (trimmed.length < MIN_PHRASE_LENGTH) {
      return t("add.minLength", { minLength: MIN_PHRASE_LENGTH });
    }
    if (trimmed.length > MAX_PHRASE_LENGTH) {
      return t("add.maxLength", { maxLength: MAX_PHRASE_LENGTH });
    }
    return null;
  };

  const handleClick = () => {
    const trimmedPhrase = newPhrase.trim();
    const validationError = validatePhrase(trimmedPhrase);
    
    if (validationError) {
      setError(validationError);
      inputRef.current?.focus();
      return;
    }

    try {
      addPhrase(trimmedPhrase);
      setNewPhrase("");
      setError(null);
      
      // Announce to screen readers
      const announcement = document.getElementById("app-announcements");
      if (announcement) {
        announcement.textContent = t("add.success");
        // Clear after announcement to allow re-announcement
        setTimeout(() => {
          announcement.textContent = "";
        }, 1000);
      }
      
      // Focus will be handled by useEffect
    } catch (err) {
      setError(t("add.error"));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
    
    // Prevent input if exceeds max length
    if (value.length <= MAX_PHRASE_LENGTH) {
      setNewPhrase(value);
    }
  };

  const charCount = newPhrase.length;
  const isNearLimit = charCount > MAX_PHRASE_LENGTH * 0.9;
  const isOverLimit = charCount > MAX_PHRASE_LENGTH;

  return (
    <Form>
      <Input
        ref={inputRef}
        type="text"
        value={newPhrase}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={t("placeholder.addPhrase")}
        aria-label={t("placeholder.addPhrase")}
        aria-invalid={!!error || isOverLimit}
        aria-describedby={error ? "phrase-error" : "phrase-char-count"}
        maxLength={MAX_PHRASE_LENGTH}
      />
      <CharCount
        id="phrase-char-count"
        $isNearLimit={isNearLimit}
        $isOverLimit={isOverLimit}
        aria-live="polite"
      >
        {charCount}/{MAX_PHRASE_LENGTH}
      </CharCount>
      {error && (
        <ErrorMessage id="phrase-error" role="alert" aria-live="assertive">
          {error}
        </ErrorMessage>
      )}
      <Button type="button" onClick={handleClick} disabled={isOverLimit}>
        {t("buttons.add")}
      </Button>
    </Form>
  );
};
