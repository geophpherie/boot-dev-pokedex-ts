import { State } from "./state"

export async function commandExit(state: State) {
	console.log("Closing the Pokedex... Goodbye!")
	state.repl.close()
	process.exit(0)
};
