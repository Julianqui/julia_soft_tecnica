import { PhrasesProvider } from "./context/PhrasesContext";
import { PhraseForm, SearchBar, PhraseGrid } from "./components";
import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <PhrasesProvider>
      <div className="container">
        <h1>{t("app.title")}</h1>
        <div className="main-layout">
          <div className="form-section">
            <PhraseForm />
          </div>
          <div className="phrases-section">
            <SearchBar />
            <PhraseGrid />
          </div>
        </div>
      </div>
    </PhrasesProvider>
  );
}

export default App;
