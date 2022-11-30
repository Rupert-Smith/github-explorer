import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Home } from "./home";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

test("Results component is displayed after user clicks search", async () => {
  render(<Home />);

  const searchButton = screen.getByRole("button", { name: "Search" });
  expect(searchButton).not.toBeDisabled();
  userEvent.click(searchButton);
  await waitForElementToBeRemoved(() => screen.getByTestId("loading-spinner"));
  const results = screen.getByTestId("results");
  expect(results).toBeInTheDocument();
});
