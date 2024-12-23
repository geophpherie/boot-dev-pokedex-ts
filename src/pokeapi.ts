import { Cache } from "./pokecache.js"

export class PokeAPI {
	private static readonly baseURL = new URL("https://pokeapi.co/api/v2/")
	#cache: Cache

	constructor(cacheReapInterval: number) {
		this.#cache = new Cache(cacheReapInterval)
	}

	async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
		let url: URL
		if (pageURL) {
			url = new URL(pageURL)
		} else {
			url = new URL("location-area", PokeAPI.baseURL)
		}

		const cachedResult = this.#cache.get<ShallowLocations>(url.toString())

		if (cachedResult) {
			return cachedResult
		}

		return fetch(url).then(async (resp) => {
			if (!resp.ok) {
				throw new Error(`HTTP Error! Status: ${resp.status}`)
			}

			const json = await resp.json()
			this.#cache.add<ShallowLocations>(url.toString(), json)

			return json
		}).catch(() => { throw new Error("Error reaching locations url") })
	}

	async fetchLocationArea(locationAreaName: string): Promise<LocationArea> {
		let url = new URL(`location-area/${locationAreaName}`, PokeAPI.baseURL)
		const cachedResult = this.#cache.get<LocationArea>(url.toString())

		if (cachedResult) {
			console.log("Cache hit!")
			return cachedResult
		}

		return fetch(url).then(async (resp) => {
			if (!resp.ok) {
				throw new Error(`HTTP Error! Status: ${resp.status}`)
			}

			const json = await resp.json()
			this.#cache.add<LocationArea>(url.toString(), json)

			return json
		}).catch(() => { throw new Error("Error reaching location url") })
	}
}

export interface ShallowLocations {
	count: number
	next: string | null
	previous: string | null
	results: Array<Location>
}

export interface Location {
	name: string
	url: string
}

export interface LocationArea {
	id: number
	name: string
	pokemon_encounters: Array<ShallowPokemon>
}

export interface ShallowPokemon {
	pokemon: Pokemon
}


export interface Pokemon {
	name: string
	url: string
}
