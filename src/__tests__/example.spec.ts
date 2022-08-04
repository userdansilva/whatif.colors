import { useExample } from "../hooks/useExample";

describe("this is fine", () => {
  it("should sum", () => {
    const { sum } = useExample();
    expect(sum(1, 2)).toBe(3);
  });
});
