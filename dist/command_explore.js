export async function commandExplore(state, locationArea) {
    const location = await state.pokeapi.fetchLocationArea(locationArea);
    for (const pokemon of location.pokemon_encounters) {
        console.log(pokemon.pokemon.name);
    }
}
;
