import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PhrasesProvider } from "../../context/PhrasesContext";
import { PhraseForm } from "../PhraseForm";
import { PhraseGrid } from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "placeholder.addPhrase": "Enter a new phrase...",
        "buttons.add": "Add Phrase",
        "buttons.delete": "Delete phrase",
        "delete.confirm": "Are you sure you want to delete this phrase?",
        "buttons.confirm": "Confirm",
        "buttons.cancel": "Cancel",
        "grid.title": "Phrases",
        "search.label": "Search",
        "placeholder.searchPhrases": "Search phrases...",
        "search.noResults": "No phrases found matching your search",
      };
      return translations[key] || key;
    },
  }),
}));

const renderWithProvider = (ui: React.ReactNode) =>
  render(<PhrasesProvider>{ui}</PhrasesProvider>);

describe("PhraseGrid (integration)", () => {
  it("adds a phrase via PhraseForm and shows it in the grid, then deletes it", async () => {
    renderWithProvider(
      <>
        <PhraseForm />
        <PhraseGrid />
      </>
    );

    const input = screen.getByPlaceholderText("Enter a new phrase...");
    const btn = screen.getByText("Add Phrase");

    fireEvent.change(input, { target: { value: "Integration phrase" } });
    fireEvent.click(btn);

    expect(screen.getByText("Integration phrase")).toBeInTheDocument();

    // Click delete button - this opens the confirmation modal
    const deleteBtn = screen.getByLabelText("Delete phrase");
    fireEvent.click(deleteBtn);

    // Confirm deletion in the modal
    const confirmBtn = screen.getByText("Confirm");
    fireEvent.click(confirmBtn);

    // Wait for phrase to be removed
    await waitFor(() => {
      expect(screen.queryByText("Integration phrase")).not.toBeInTheDocument();
    });
  });
});
