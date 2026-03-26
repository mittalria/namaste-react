import { sumDummyTesting } from "../sumDummyTesting";

test("Sum function should calculate sum of two numbers", () => {
  const result = sumDummyTesting(3, 4);

  expect(result).toBe(7); //assertion
});
