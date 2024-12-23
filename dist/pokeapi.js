import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = new URL("https://pokeapi.co/api/v2/");
    #cache;
    constructor(cacheReapInterval) {
        this.#cache = new Cache(cacheReapInterval);
    }
    async fetchLocations(pageURL) {
        let url;
        if (pageURL) {
            url = new URL(pageURL);
        }
        else {
            url = new URL("location-area", PokeAPI.baseURL);
        }
        const cachedResult = this.#cache.get(url.toString());
        if (cachedResult) {
            return cachedResult;
        }
        return fetch(url).then(async (resp) => {
            if (!resp.ok) {
                throw new Error(`HTTP Error! Status: ${resp.status}`);
            }
            const json = await resp.json();
            this.#cache.add(url.toString(), json);
            return json;
        }).catch(() => { throw new Error("Error reaching locations url"); });
    }
    async fetchLocationArea(locationAreaName) {
        let url = new URL(`location-area/${locationAreaName}`, PokeAPI.baseURL);
        const cachedResult = this.#cache.get(url.toString());
        if (cachedResult) {
            console.log("Cache hit!");
            return cachedResult;
        }
        return fetch(url).then(async (resp) => {
            if (!resp.ok) {
                throw new Error(`HTTP Error! Status: ${resp.status}`);
            }
            const json = await resp.json();
            this.#cache.add(url.toString(), json);
            return json;
        }).catch(() => { throw new Error("Error reaching location url"); });
    }
}
