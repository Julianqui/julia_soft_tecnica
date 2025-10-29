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

describe("PhraseCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders phrase text and calls delete on button click", () => {
    const phrase = { id: "1", text: "Hello world", createdAt: new Date() };

    render(<PhraseCard phrase={phrase} />);

    expect(screen.getByText("Hello world")).toBeInTheDocument();

    const btn = screen.getByLabelText("Delete phrase");
    fireEvent.click(btn);

    expect(mockDelete).toHaveBeenCalledWith("1");
  });
});
