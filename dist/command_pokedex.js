export async function commandPokedex(state) {
    console.log("Your Pokedex");
    for (const key of state.pokedex.keys()) {
        console.log(`  - ${key}`);
    }
}
;
