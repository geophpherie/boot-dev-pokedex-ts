import { cleanInput } from "./repl"
import { describe, expect, test } from "vitest"

describe.each([
	{
		input: "  hello     world  ",
		expected: ["hello", "world"],
	},
	{
		input: "hellofriend  ",
		expected: ["hellofriend"],
	},
	{
		input: "hello friend",
		expected: ["hello", "friend"],
	}
])("cleanInput($input)", ({ input, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = cleanInput(input)

		// expect there to be the correct number of words
		expect(actual).toHaveLength(expected.length)

		// make sure each word matches
		for (const i in expected) {
			expect(actual[i]).toBe(expected[i])
		}

	})
})
