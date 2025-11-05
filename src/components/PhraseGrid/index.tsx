import type { FC } from "react";
import { useRef } from "react";
import { usePhrases } from "../../context/PhrasesContext";
import { PhraseCard } from "../PhraseCard";
import { Grid, EmptyState } from "./styles";
import { useTranslation } from "react-i18next";

export const PhraseGrid: FC = () => {
  const { phrases, searchQuery, originalPhrases } = usePhrases();
  const { t } = useTranslation();
  const gridRef = useRef<HTMLDivElement>(null);

  const hasOriginalPhrases = Array.isArray(originalPhrases) && originalPhrases.length > 0;
  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasFilteredResults = Array.isArray(phrases) && phrases.length > 0;

  // Handle focus management when a phrase is deleted
  const handleDelete = (deletedId: string) => {
    // Find the next card to focus on
    const currentIndex = phrases.findIndex((p) => p.id === deletedId);
    const nextPhrase = phrases[currentIndex + 1] || phrases[currentIndex - 1];
    
    if (nextPhrase) {
      // Find the next card by data attribute
      const nextCard = document.querySelector(`[data-phrase-id="${nextPhrase.id}"]`) as HTMLDivElement;
      if (nextCard) {
        // Focus on the next card's delete button or the card itself
        const deleteButton = nextCard.querySelector('button') as HTMLButtonElement;
        if (deleteButton) {
          setTimeout(() => deleteButton.focus(), 0);
        }
      }
    } else if (phrases.length === 1) {
      // If it was the last phrase, focus back to the grid container
      gridRef.current?.focus();
    }
  };

  return (
    <section>
      {hasOriginalPhrases && (
        <h2>{t("grid.title")}</h2>
      )}
      <Grid ref={gridRef} tabIndex={-1}>
        {hasFilteredResults ? (
          phrases.map((phrase) => (
            <PhraseCard key={phrase.id} phrase={phrase} onDelete={handleDelete} />
          ))
        ) : hasSearchQuery ? (
          <EmptyState>
            {t("search.noResults")}
          </EmptyState>
        ) : null}
      </Grid>
    </section>
  );
};
