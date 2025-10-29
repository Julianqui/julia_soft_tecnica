import { render, screen, fireEvent } from "@testing-library/react";
import { PhraseForm } from "./index";

const mockAdd = jest.fn();

jest.mock("../../context/PhrasesContext", () => ({
  usePhrases: () => ({
    addPhrase: mockAdd,
  }),
}));

describe("PhraseForm", () => {
  beforeEach(() => mockAdd.mockClear());

  it("calls addPhrase and clears input on submit", () => {
    render(<PhraseForm />);

    const input = screen.getByPlaceholderText("Enter a new phrase...");
    const button = screen.getByText("Add Phrase");

    fireEvent.change(input, { target: { value: "New phrase" } });
    fireEvent.click(button);

    expect(mockAdd).toHaveBeenCalledWith("New phrase");
    expect(input).toHaveValue("");
  });
});
