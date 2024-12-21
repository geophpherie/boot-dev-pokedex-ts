import { State } from "./state"

export async function commandMap(state: State) {
	return await state.pokeapi.fetchLocations()
};
