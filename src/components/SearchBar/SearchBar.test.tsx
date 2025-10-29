import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./index";

const mockSet = jest.fn();

// Mock useDebounce to call the function immediately (avoid timers in unit test)
jest.mock("../../hooks/useDebounce", () => ({
  useDebounce: (fn: any) => fn,
}));

jest.mock("../../context/PhrasesContext", () => ({
  usePhrases: () => ({
    searchQuery: "",
    setSearchQuery: mockSet,
    phrases: [{ id: "1", text: "hello", createdAt: new Date() }],
  }),
}));

describe("SearchBar", () => {
  beforeEach(() => mockSet.mockClear());

  it("updates search query when user types", () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search phrases...");
    fireEvent.change(input, { target: { value: "hello" } });

    expect(mockSet).toHaveBeenCalledWith("hello");
  });
});
