import { PhrasesProvider } from "./context/PhrasesContext";
import { PhraseForm } from "./components/PhraseForm";
import { SearchBar } from "./components/SearchBar";
import { PhraseGrid } from "./components/PhraseGrid";
import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <PhrasesProvider>
      <div className="container">
        <h1>{t("app.title")}</h1>
        <SearchBar />
        <PhraseForm />
        <PhraseGrid />
      </div>
    </PhrasesProvider>
  );
}

export default App;
