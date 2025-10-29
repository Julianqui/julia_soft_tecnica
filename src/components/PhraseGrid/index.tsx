import type { FC } from "react";
import { usePhrases } from "../../context/PhrasesContext";
import { PhraseCard } from "../PhraseCard";
import { Grid } from "./styles";
import { useTranslation } from "react-i18next";

export const PhraseGrid: FC = () => {
  const { phrases } = usePhrases();
  const { t } = useTranslation();

  return (
    <section>
      {Array.isArray(phrases) && phrases.length > 0 && (
        <h2>{t("grid.title")}</h2>
      )}
      <Grid>
        {phrases.map((phrase) => (
          <PhraseCard key={phrase.id} phrase={phrase} />
        ))}
      </Grid>
    </section>
  );
};
