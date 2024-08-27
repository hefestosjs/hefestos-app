import { describe, expect, it } from "@jest/globals";

function sum(x: number, y: number) {
	return x + y;
}

describe("Sample test", () => {
	it("should test a sum and return the value 3", () => {
		expect(sum(1, 2)).toBe(3);
	});
});
