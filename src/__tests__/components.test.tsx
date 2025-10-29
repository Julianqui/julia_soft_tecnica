import { render, screen, fireEvent } from "@testing-library/react";
import { PhraseForm } from "../components/PhraseForm";
import { SearchBar } from "../components/SearchBar";
import { PhraseGrid } from "../components/PhraseGrid";
import { PhrasesProvider } from "../context/PhrasesContext";

const renderWithProvider = (component: React.ReactNode) => {
  return render(<PhrasesProvider>{component}</PhrasesProvider>);
};

describe("Phrase Manager Components", () => {
  describe("PhraseForm", () => {
    it("should add a new phrase when submitted", () => {
      renderWithProvider(<PhraseForm />);

      const input = screen.getByPlaceholderText("Enter a new phrase...");
      const submitButton = screen.getByText("Add Phrase");

      fireEvent.change(input, { target: { value: "Test phrase" } });
      fireEvent.click(submitButton);

      expect(input).toHaveValue("");
    });
  });

  describe("SearchBar", () => {
    it("should update search query on input change", () => {
      // Render form so we can add a phrase and make the SearchBar appear
      renderWithProvider(
        <>
          <PhraseForm />
          <SearchBar />
        </>
      );

      // add a phrase so the search bar becomes visible
      const input = screen.getByPlaceholderText("Enter a new phrase...");
      const submitButton = screen.getByText("Add Phrase");
      fireEvent.change(input, { target: { value: "test phrase" } });
      fireEvent.click(submitButton);

      const searchInput = screen.getByPlaceholderText("Search phrases...");
      fireEvent.change(searchInput, { target: { value: "test" } });

      expect(searchInput).toHaveValue("test");
    });
  });

  describe("PhraseGrid", () => {
    it("should display phrases and allow deletion", () => {
      renderWithProvider(
        <>
          <PhraseForm />
          <PhraseGrid />
        </>
      );

      const input = screen.getByPlaceholderText("Enter a new phrase...");
      const submitButton = screen.getByText("Add Phrase");

      // Add a phrase
      fireEvent.change(input, { target: { value: "Test phrase" } });
      fireEvent.click(submitButton);

      // Verify phrase is displayed
      const phraseElement = screen.getByText("Test phrase");
      expect(phraseElement).toBeInTheDocument();

      // Delete phrase
      const deleteButton = screen.getByLabelText("Delete phrase");
      fireEvent.click(deleteButton);

      // Verify phrase is removed
      expect(screen.queryByText("Test phrase")).not.toBeInTheDocument();
    });
  });
});
