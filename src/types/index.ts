export interface Phrase {
  id: string;
  text: string;
  createdAt: Date;
}

export interface PhrasesState {
  phrases: Phrase[];
  searchQuery: string;
}

export interface PhrasesContextType extends PhrasesState {
  addPhrase: (text: string) => void;
  deletePhrase: (id: string) => void;
  setSearchQuery: (query: string) => void;
}
