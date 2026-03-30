import { act, fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../mocks/restrauntListMock.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

test("Should search restraunts list for burger keyword", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>,
    );
  });

  const cardsBeforeSearch = screen.getAllByTestId("resCard");

  expect(cardsBeforeSearch.length).toBe(9);

  const searchButton = screen.getByRole("button", { name: "Search" });
  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, { target: { value: "burger" } });
  fireEvent.click(searchButton);

  const cardsAfterSearch = screen.getAllByTestId("resCard");

  expect(cardsAfterSearch.length).toBe(1);
});

test("Should filter top rated restraunts", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>,
    );
  });

  const cardsBeforeFilter = screen.getAllByTestId("resCard");

  expect(cardsBeforeFilter.length).toBe(9);

  const topRatedButton = screen.getByTestId("topRatedRestraunts");

  fireEvent.click(topRatedButton);

  const cardsAfterFilter = screen.getAllByTestId("resCard");

  expect(cardsAfterFilter.length).toBe(2);
});
