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

	async fetchPokemon(pokemon: string): Promise<Pokemon> {
		let url = new URL(`pokemon/${pokemon}`, PokeAPI.baseURL)
		const cachedResult = this.#cache.get<Pokemon>(url.toString())
		if (cachedResult) {
			console.log("Cache hit!")
			return cachedResult
		}

		return fetch(url).then(async (resp) => {
			if (!resp.ok) {
				throw new Error(`HTTP Error! Status: ${resp.status}`)
			}

			const json = await resp.json()
			this.#cache.add<Pokemon>(url.toString(), json)

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
	pokemon_encounters: Array<{ pokemon: LocationPokemon }>
}

export interface LocationPokemon {
	name: string
	url: string
}

export interface Pokemon {
	name: string
	base_experience: number
	height: number
	weight: number
	stats: Array<PokemonStats>
	types: Array<PokemonTypes>
}

export interface PokemonStats {
	base_stat: number
	stat: {
		name: string
		url: string
	}
}
export interface PokemonTypes {
	type: {
		name: string
		url: string
	}
}
