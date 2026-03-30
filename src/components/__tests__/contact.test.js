import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us Page test cases", () => {
  beforeAll(() => {//afterAll is also there
    // console.log("Before All");
  });

  beforeEach(() => {//afterEach is also there
    // console.log("Before Each");
  });

  it("Should load contact us component", () => {
    //it and test are same
    render(<Contact />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });

  it("Should load button inside contact us component", () => {
    render(<Contact />);

    const button = screen.getByText("Submit");

    expect(button).toBeInTheDocument();
  });

  test("Should load input name inside contact us component", () => {
    render(<Contact />);

    const inputName = screen.getByPlaceholderText("name");

    expect(inputName).toBeInTheDocument();
  });

  test("Should load two input boxes inside contact us component", () => {
    render(<Contact />);

    const inputBoxes = screen.getAllByRole("textbox");

    expect(inputBoxes.length).toBe(2);
  });
});
