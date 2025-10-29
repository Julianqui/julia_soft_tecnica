import type { FC, ChangeEvent } from "react";
import { usePhrases } from "../../context/PhrasesContext";
import { useDebounce } from "../../hooks/useDebounce";
import { withLoading } from "../../hoc/withLoading";
import { Container, Input, Label } from "./styles";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  isLoading?: boolean;
}

const SearchBarComponent: FC<SearchBarProps> = ({ isLoading }) => {
  const { searchQuery, setSearchQuery, originalPhrases } = usePhrases();
  const { t } = useTranslation();

  const debouncedSetSearchQuery = useDebounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchQuery(e.target.value);
  };

  // show search only if there is at least one phrase in the original list (not filtered)
  const hasOriginalPhrases = Array.isArray(originalPhrases) && originalPhrases.length > 0;
  if (!hasOriginalPhrases) return null;

  return (
    <Container>
      <Label>{t("search.label")}</Label>
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
