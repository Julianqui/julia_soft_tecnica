import type { FC, ChangeEvent } from "react";
import { usePhrases } from "../../context/PhrasesContext";
import { useDebounce } from "../../hooks/useDebounce";
import { withLoading } from "../../hoc/withLoading";
import { Container, Input, Label, Icon } from "./styles";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  isLoading?: boolean;
}

const SearchBarComponent: FC<SearchBarProps> = ({ isLoading }) => {
  const { searchQuery, setSearchQuery } = usePhrases();
  const { t } = useTranslation();
  const { phrases } = usePhrases();

  const debouncedSetSearchQuery = useDebounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchQuery(e.target.value);
  };

  // show search only if there is at least one phrase
  if (!Array.isArray(phrases) || phrases.length === 0) return null;

  return (
    <Container>
      <Label>{t("search.label")}</Label>
      <Icon aria-hidden>
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16a6.471 6.471 0 004.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </Icon>
      <Input
        type="text"
        defaultValue={searchQuery}
        onChange={handleSearch}
        placeholder={
          isLoading
            ? t("placeholder.searching")
            : t("placeholder.searchPhrases")
        }
        disabled={isLoading}
      />
    </Container>
  );
};

export const SearchBar = withLoading(SearchBarComponent);
