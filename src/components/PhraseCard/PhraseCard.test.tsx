import { render, screen, fireEvent } from "@testing-library/react";
import { PhraseCard } from "./index";
import React from "react";

const mockDelete = jest.fn();

jest.mock("../../context/PhrasesContext", () => ({
  usePhrases: () => ({
    deletePhrase: mockDelete,
  }),
  PhrasesProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "buttons.delete": "Delete phrase",
        "delete.confirm": "Are you sure you want to delete this phrase?",
        "buttons.confirm": "Confirm",
        "buttons.cancel": "Cancel",
      };
      return translations[key] || key;
    },
  }),
}));

describe("PhraseCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders phrase text and calls delete on button click after confirmation", () => {
    const phrase = { id: "1", text: "Hello world", createdAt: new Date() };

    render(<PhraseCard phrase={phrase} />);

    expect(screen.getByText("Hello world")).toBeInTheDocument();

    // Click delete button - this opens the confirmation modal
    const btn = screen.getByLabelText("Delete phrase");
    fireEvent.click(btn);

    // Verify modal is shown
    expect(screen.getByText("Are you sure you want to delete this phrase?")).toBeInTheDocument();

    // Confirm deletion
    const confirmBtn = screen.getByText("Confirm");
    fireEvent.click(confirmBtn);

    // Verify delete was called
    expect(mockDelete).toHaveBeenCalledWith("1");
  });

  it("cancels deletion when cancel button is clicked", () => {
    const phrase = { id: "1", text: "Hello world", createdAt: new Date() };

    render(<PhraseCard phrase={phrase} />);

    const btn = screen.getByLabelText("Delete phrase");
    fireEvent.click(btn);

    // Verify modal is shown
    expect(screen.getByText("Are you sure you want to delete this phrase?")).toBeInTheDocument();

    // Cancel deletion
    const cancelBtn = screen.getByText("Cancel");
    fireEvent.click(cancelBtn);

    // Verify delete was NOT called
    expect(mockDelete).not.toHaveBeenCalled();

    // Verify phrase is still displayed
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
