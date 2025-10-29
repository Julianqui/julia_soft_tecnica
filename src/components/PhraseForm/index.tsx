import type { FC } from "react";
import { useState } from "react";
import { usePhrases } from "../../context/PhrasesContext";
import { Form, Input, Button } from "./styles";
import { useTranslation } from "react-i18next";

export const PhraseForm: FC = () => {
  const [newPhrase, setNewPhrase] = useState("");
  const { addPhrase } = usePhrases();
  const { t } = useTranslation();

  const handleClick = () => {
    const trimmedPhrase = newPhrase.trim();
    if (trimmedPhrase && trimmedPhrase.length > 0) {
      addPhrase(trimmedPhrase);
      setNewPhrase("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhrase(e.target.value);
  };

  return (
    <Form>
      <Input
        type="text"
        value={newPhrase}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={t("placeholder.addPhrase")}
      />
      <Button type="button" onClick={handleClick}>
        {t("buttons.add")}
      </Button>
    </Form>
  );
};
