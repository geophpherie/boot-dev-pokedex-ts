import { State } from "./state"

export async function commandCatch(state: State, pokemonName: string) {
	console.log(`Throwing a Pokeball at ${pokemonName}...`)

	const pokemon = await state.pokeapi.fetchPokemon(pokemonName)

	const catchOdds = Math.random()
	const multi = 1 - (pokemon.base_experience / 300)
	const catchProb = catchOdds * multi

	if (catchProb > 0.5) {
		console.log(`${pokemonName} was caught!`)
		state.pokedex.set(pokemonName, pokemon)
	} else {
		console.log(`${pokemonName} escaped!`)
	}
};
