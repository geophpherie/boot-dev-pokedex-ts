export class PokeAPI {
    static baseURL = new URL("https://pokeapi.co/api/v2/");
    constructor() { }
    async fetchLocations(pageURL) {
        let url;
        if (pageURL) {
            url = new URL(pageURL);
        }
        else {
            url = new URL("location-area", PokeAPI.baseURL);
        }
        return await fetch(url).then(async (resp) => {
            if (!resp.ok) {
                throw new Error(`HTTP Error! Status: ${resp.status}`);
            }
            return resp.json();
        }).catch(() => { throw new Error("Error reaching locations url"); });
    }
}
