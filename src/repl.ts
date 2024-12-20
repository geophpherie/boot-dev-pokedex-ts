import { State } from "./state.js"

export function cleanInput(input: string): string[] {
	return input.trim().split(" ").filter((word) => word != "").map((word) => word.trim().toLowerCase())
}

export function startREPL(state: State) {

	state.repl.prompt()
	state.repl.on("line", (input) => {
		const words = cleanInput(input)

		if (words.length == 0) {
			state.repl.prompt()
			return
		} else {
			const command = state.commands[words[0]]
			if (command === undefined) {
				console.log("Unknown command")
			} else {
				const error = command.callback(state)
				if (error !== undefined) {
					console.log(error)
				}
			}
			state.repl.prompt()
			return
		}
	})


}
