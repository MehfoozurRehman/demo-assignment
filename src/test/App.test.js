import { act, fireEvent, render } from "@testing-library/react";
import App from "../App";

it("search input response validator", async () => {
  const { getByTestId } = render(<App />);
  const searchInput = getByTestId("searchInput");
  const searchQuery = getByTestId("searchQuery");
  expect(searchInput).toBeTruthy();
  expect(searchQuery).toBeTruthy();
  await act(async () => {
    const inputText = "luna";
    await fireEvent.change(searchInput, { target: { value: inputText } });
    expect(searchQuery.innerHTML).toBe("search query: " + inputText);
  });
});
