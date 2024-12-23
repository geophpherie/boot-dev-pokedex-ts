import { State } from "./state"

export async function commandInspect(state: State, pokemonName: string) {
	const pokemon = state.pokedex.get(pokemonName)

	if (pokemon === undefined) {
		console.log("you have not caught that pokemon")
		return
	}

	console.log(`Name: ${pokemon.name}`)
	console.log(`Height: ${pokemon.height}`)
	console.log(`Weight: ${pokemon.weight}`)
	console.log("Stats:")
	for (const stat of pokemon.stats) {
		console.log(`  -${stat.stat.name}: ${stat.base_stat}`)
	}
	console.log("Types:")
	for (const type of pokemon.types) {
		console.log(`  - ${type.type.name}`)
	}
};
