import "@testing-library/jest-dom";
// initialize i18n for tests
import "./i18n";
import i18n from "./i18n";

// run tests with English so existing test expectations remain unchanged
i18n.changeLanguage("en");
// ensure tests start with a clean storage state
if (typeof localStorage !== "undefined" && localStorage.clear) {
  // clear once at setup
  localStorage.clear();
}

// Also clear before each test to avoid state leaking between tests
if (typeof beforeEach === "function") {
  // eslint-disable-next-line jest/no-standalone-expect
  beforeEach(() => {
    if (typeof localStorage !== "undefined" && localStorage.clear) {
      localStorage.clear();
    }
  });
}
