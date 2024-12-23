import { State } from "./state"

export async function commandExplore(state: State, locationArea: string) {
	const location = await state.pokeapi.fetchLocationArea(locationArea)

	for (const pokemon of location.pokemon_encounters) {
		console.log(pokemon.pokemon.name)
	}
};

