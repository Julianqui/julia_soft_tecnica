import type { FC } from "react";
import type { Phrase } from "../../types";
import { usePhrases } from "../../context/PhrasesContext";
import { Card, Text, DeleteButton } from "./styles";
import { useTranslation } from "react-i18next";

interface PhraseCardProps {
  phrase: Phrase;
}

export const PhraseCard: FC<PhraseCardProps> = ({ phrase }) => {
  const { deletePhrase } = usePhrases();
  const { t } = useTranslation();

  return (
    <Card>
      <Text>{phrase.text}</Text>
      <DeleteButton
        onClick={() => deletePhrase(phrase.id)}
        aria-label={t("buttons.delete")}
      >
        ×
      </DeleteButton>
    </Card>
  );
};
