import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import type { ReactNode } from "react";

interface Phrase {
  id: string;
  text: string;
  createdAt: Date;
}

interface PhrasesState {
  phrases: Phrase[];
  searchQuery: string;
}

interface PhrasesContextType extends PhrasesState {
  originalPhrases: Phrase[];
  addPhrase: (text: string) => void;
  deletePhrase: (id: string) => void;
  setSearchQuery: (query: string) => void;
}

const PhrasesContext = createContext<PhrasesContextType | undefined>(undefined);

const STORAGE_KEY = "phrases_v1";

const loadInitialState = (): PhrasesState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { phrases: [], searchQuery: "" };
    const parsed: Array<{ id: string; text: string; createdAt: string }> =
      JSON.parse(raw);
    return {
      phrases: parsed.map((p) => ({ ...p, createdAt: new Date(p.createdAt) })),
      searchQuery: "",
    };
  } catch (e) {
    // if anything fails, fallback to empty state
    return { phrases: [], searchQuery: "" };
  }
};

type Action =
  | { type: "ADD_PHRASE"; payload: string }
  | { type: "DELETE_PHRASE"; payload: string }
  | { type: "SET_SEARCH_QUERY"; payload: string };

const phrasesReducer = (state: PhrasesState, action: Action): PhrasesState => {
  switch (action.type) {
    case "ADD_PHRASE":
      return {
        ...state,
        phrases: [
          ...state.phrases,
          {
            id: crypto.randomUUID(),
            text: action.payload,
            createdAt: new Date(),
          },
        ],
      };
    case "DELETE_PHRASE":
      return {
        ...state,
        phrases: state.phrases.filter((phrase) => phrase.id !== action.payload),
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export const PhrasesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    phrasesReducer,
    { phrases: [], searchQuery: "" },
    () => loadInitialState()
  );

  // persist phrases to localStorage whenever they change
  useEffect(() => {
    try {
      const serializable = state.phrases.map((p) => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
    } catch (e) {
      // ignore write errors
    }
  }, [state.phrases]);

  const addPhrase = useCallback((text: string) => {
    dispatch({ type: "ADD_PHRASE", payload: text });
  }, []);

  const deletePhrase = useCallback((id: string) => {
    dispatch({ type: "DELETE_PHRASE", payload: id });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  }, []);

  const filteredPhrases = useMemo(() => {
    return state.phrases.filter((phrase) =>
      phrase.text.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.phrases, state.searchQuery]);

  const value = useMemo(
    () => ({
      ...state,
      phrases: filteredPhrases,
      originalPhrases: state.phrases,
      addPhrase,
      deletePhrase,
      setSearchQuery,
    }),
    [state, filteredPhrases, addPhrase, deletePhrase, setSearchQuery]
  );

  return (
    <PhrasesContext.Provider value={value}>{children}</PhrasesContext.Provider>
  );
};

export const usePhrases = () => {
  const context = useContext(PhrasesContext);
  if (context === undefined) {
    throw new Error("usePhrases must be used within a PhrasesProvider");
  }
  return context;
};
