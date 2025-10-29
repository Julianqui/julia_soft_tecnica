import type { FC, FormEvent } from "react";
import { useState } from "react";
import { usePhrases } from "../../context/PhrasesContext";
import { Form, Input, Button } from "./styles";
import { useTranslation } from "react-i18next";

export const PhraseForm: FC = () => {
  const [newPhrase, setNewPhrase] = useState("");
  const { addPhrase } = usePhrases();
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPhrase.trim()) {
      addPhrase(newPhrase.trim());
      setNewPhrase("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={newPhrase}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewPhrase(e.target.value)
        }
        placeholder={t("placeholder.addPhrase")}
      />
      <Button type="submit">{t("buttons.add")}</Button>
    </Form>
  );
};
