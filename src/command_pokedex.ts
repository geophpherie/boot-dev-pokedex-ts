import { State } from "./state"

export async function commandPokedex(state: State) {
	console.log("Your Pokedex")
	for (const key of state.pokedex.keys()) {
		console.log(`  - ${key}`)
	}
};
