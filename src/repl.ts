import { createInterface } from "readline"

export function cleanInput(input: string): string[] {
	const words = input.trim().split(" ").filter((word) => word != "")

	words.forEach((word) => { word.trim() })

	return words
}

export function startREPL() {
	const repl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > "
	})

	repl.prompt()
	repl.on("line", (input) => {
		const words = cleanInput(input)

		//if (words.length == 0)
	})


}
