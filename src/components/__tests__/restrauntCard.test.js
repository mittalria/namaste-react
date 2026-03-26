import { render, screen } from "@testing-library/react";
import RestrauntCard from "../RestrauntCard";
import MOCK_DATA from "../mocks/restrauntCardMock.json";
import "@testing-library/jest-dom";

it("Should render Restraunt Card component with props data", () => {
  render(<RestrauntCard resData={MOCK_DATA} />);

  const name = screen.getByText("Pizza Paradise");

  expect(name).toBeInTheDocument();
});

it("Should render Restraunt Card component with promoted label", () => {
  render(<RestrauntCard resData={MOCK_DATA} />);

  const name = screen.getByText("Pizza Paradise");

  expect(name).toBeInTheDocument();
});
