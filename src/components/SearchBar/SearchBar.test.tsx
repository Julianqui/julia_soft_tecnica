import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "./index";

const mockSetSearchQuery = jest.fn();

jest.mock("../../context/PhrasesContext", () => ({
  usePhrases: () => ({
    searchQuery: "",
    setSearchQuery: mockSetSearchQuery,
    phrases: [
      { id: "1", text: "hello world", createdAt: new Date() },
      { id: "2", text: "test phrase", createdAt: new Date() },
      { id: "3", text: "another test", createdAt: new Date() },
    ],
    originalPhrases: [
      { id: "1", text: "hello world", createdAt: new Date() },
      { id: "2", text: "test phrase", createdAt: new Date() },
      { id: "3", text: "another test", createdAt: new Date() },
    ],
  }),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, any>) => {
      const translations: Record<string, string> = {
        "search.label": "Search",
        "placeholder.searchPhrases": "Search phrases...",
        "placeholder.searching": "Searching...",
        "search.hint": `Minimum ${params?.minLength || 2} characters to search`,
      };
      return translations[key] || key;
    },
  }),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockSetSearchQuery.mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("updates search query when user types valid input", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search phrases...") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "hello" } });
    
    // Fast-forward time to trigger debounce
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith("hello");
    });
  });

  it("applies debounce delay before setting search query", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search phrases...") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "test" } });
    
    // Should not be called immediately
    expect(mockSetSearchQuery).not.toHaveBeenCalled();
    
    // Fast-forward 299ms - still should not be called
    jest.advanceTimersByTime(299);
    expect(mockSetSearchQuery).not.toHaveBeenCalled();
    
    // Fast-forward 1ms more to complete debounce
    jest.advanceTimersByTime(1);
    
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith("test");
    });
  });

  it("clears search query when input is below minimum length", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search phrases...") as HTMLInputElement;
    
    // Type a single character (below min length of 2)
    fireEvent.change(input, { target: { value: "h" } });
    
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith("");
    });
  });

  it("allows search with minimum length of 2 characters", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search phrases...") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "he" } });
    
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith("he");
    });
  });

  it("trims and collapses multiple spaces in search input", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search phrases...") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "  hello    world  " } });
    
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith("hello world");
    });
  });

  it("handles empty input correctly", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search phrases...") as HTMLInputElement;
    
    // First type something, then clear it to trigger a change
    fireEvent.change(input, { target: { value: "test" } });
    jest.advanceTimersByTime(300);
    
    // Clear the input
    fireEvent.change(input, { target: { value: "" } });
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith("");
    });
  });

  it("cancels previous debounce when typing rapidly", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search phrases...") as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "h" } });
    jest.advanceTimersByTime(150);
    
    fireEvent.change(input, { target: { value: "he" } });
    jest.advanceTimersByTime(150);
    
    fireEvent.change(input, { target: { value: "hel" } });
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      // Should only be called once with the final value
      expect(mockSetSearchQuery).toHaveBeenCalledTimes(1);
      expect(mockSetSearchQuery).toHaveBeenCalledWith("hel");
    });
  });

  it("handles special regex characters correctly", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search phrases...") as HTMLInputElement;
    
    // Test with special regex characters that should be escaped
    fireEvent.change(input, { target: { value: "test.*" } });
    
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith("test.*");
    });
  });

  it("does not render when there are no original phrases", () => {
    // Mock with empty originalPhrases
    const mockUsePhrases = jest.spyOn(require("../../context/PhrasesContext"), "usePhrases");
    mockUsePhrases.mockReturnValueOnce({
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      phrases: [],
      originalPhrases: [],
    });

    const { container } = render(<SearchBar />);
    // The component should return null, so the container should be empty
    expect(container.textContent).toBe("");
    
    mockUsePhrases.mockRestore();
  });
});
