export async function commandMap(state) {
    let locations;
    if (state.nextLocationsURL) {
        locations = await state.pokeapi.fetchLocations(state.nextLocationsURL.toString());
    }
    else {
        locations = await state.pokeapi.fetchLocations();
    }
    if (locations.next) {
        state.nextLocationsURL = new URL(locations.next);
    }
    if (locations.previous) {
        state.prevLocationsURL = new URL(locations.previous);
    }
    for (const location of locations.results) {
        console.log(location.name);
    }
}
;
export async function commandMapb(state) {
    let locations;
    if (state.prevLocationsURL) {
        locations = await state.pokeapi.fetchLocations(state.prevLocationsURL.toString());
    }
    else {
        console.log("you're on the first page");
        return;
    }
    if (locations.next) {
        state.nextLocationsURL = new URL(locations.next);
    }
    if (locations.previous) {
        state.prevLocationsURL = new URL(locations.previous);
    }
    for (const location of locations.results) {
        console.log(location.name);
    }
}
;
