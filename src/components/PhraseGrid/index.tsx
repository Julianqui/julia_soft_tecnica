import type { FC } from "react";
import { usePhrases } from "../../context/PhrasesContext";
import { PhraseCard } from "../PhraseCard";
import { Grid } from "./styles";
import { useTranslation } from "react-i18next";

export const PhraseGrid: FC = () => {
  const { phrases, searchQuery, originalPhrases } = usePhrases();
  const { t } = useTranslation();

  const hasOriginalPhrases = Array.isArray(originalPhrases) && originalPhrases.length > 0;
  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasFilteredResults = Array.isArray(phrases) && phrases.length > 0;

  return (
    <section>
      {hasOriginalPhrases && (
        <h2>{t("grid.title")}</h2>
      )}
      <Grid>
        {hasFilteredResults ? (
          phrases.map((phrase) => (
            <PhraseCard key={phrase.id} phrase={phrase} />
          ))
        ) : hasSearchQuery ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '2rem',
            color: '#666',
            fontSize: '1.1rem'
          }}>
            {t("search.noResults")}
          </div>
        ) : null}
      </Grid>
    </section>
  );
};
