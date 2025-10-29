import { render, screen, fireEvent } from "@testing-library/react";
import { PhrasesProvider } from "../../context/PhrasesContext";
import { PhraseForm } from "../PhraseForm";
import { PhraseGrid } from "./index";

const renderWithProvider = (ui: React.ReactNode) =>
  render(<PhrasesProvider>{ui}</PhrasesProvider>);

describe("PhraseGrid (integration)", () => {
  it("adds a phrase via PhraseForm and shows it in the grid, then deletes it", () => {
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

    const deleteBtn = screen.getByLabelText("Delete phrase");
    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Integration phrase")).not.toBeInTheDocument();
  });
});
