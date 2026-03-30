import { act, fireEvent, render, screen } from "@testing-library/react";
import RestaurantMenu from "../RestaurantMenu";
import MOCK_DATA from "../mocks/restrauntMenuMock.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Cart from "../Cart";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  }),
);

it("Should load restraunt menu component", async () => {
  await act(async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
        <RestaurantMenu />
        <Cart/>
      </Provider>,
    );
  });

  const accordionHeader = screen.getByText("Nigiri (2)");
  fireEvent.click(accordionHeader);

  const items = screen.getAllByTestId("foodItems");
  expect(items.length).toBe(2);

  const addButtons = screen.getAllByRole("button", { name: "Add +" });
  fireEvent.click(addButtons[0]);

  expect(screen.getByText("Cart (1 items)")).toBeInTheDocument();
  expect(screen.getAllByTestId("foodItems").length).toBe(3);
});
