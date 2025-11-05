import type { FC, ChangeEvent } from "react";
import { usePhrases } from "../../context/PhrasesContext";
import { useDebounce } from "../../hooks/useDebounce";
import { withLoading } from "../../hoc/withLoading";
import { Container, Input, Label } from "./styles";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  isLoading?: boolean;
}

const MIN_SEARCH_LENGTH = 2;
const MAX_SEARCH_LENGTH = 100; // Same as MAX_PHRASE_LENGTH

// Collapse multiple spaces into one
function collapseSpaces(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

const SearchBarComponent: FC<SearchBarProps> = ({ isLoading }) => {
  const { searchQuery, setSearchQuery, originalPhrases } = usePhrases();
  const { t } = useTranslation();

  const debouncedSetSearchQuery = useDebounce((value: string) => {
    const processed = collapseSpaces(value);
    // Only set search query if it meets minimum length or is empty
    if (processed.length === 0 || processed.length >= MIN_SEARCH_LENGTH) {
      setSearchQuery(processed);
    } else {
      // Clear search if below minimum length
      setSearchQuery("");
    }
  }, 300);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchQuery(e.target.value);
  };

  // show search only if there is at least one phrase in the original list (not filtered)
  const hasOriginalPhrases = Array.isArray(originalPhrases) && originalPhrases.length > 0;
  if (!hasOriginalPhrases) return null;

  return (
    <Container>
      <Label htmlFor="search-input">{t("search.label")}</Label>
      <Input
        id="search-input"
        type="text"
        defaultValue={searchQuery}
        onChange={handleSearch}
        placeholder={
          isLoading
            ? t("placeholder.searching")
            : t("placeholder.searchPhrases")
        }
        disabled={isLoading}
        aria-label={t("search.label")}
        aria-describedby="search-hint"
        maxLength={MAX_SEARCH_LENGTH}
      />
      <span id="search-hint" className="sr-only">
        {t("search.hint", { minLength: MIN_SEARCH_LENGTH })}
      </span>
    </Container>
  );
};

export const SearchBar = withLoading(SearchBarComponent);
