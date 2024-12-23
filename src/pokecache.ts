export type CacheEntry<T> = {
	createdAt: number
	val: T
}

export class Cache {
	#cache = new Map<string, CacheEntry<any>>();
	#reapIntervalId: NodeJS.Timeout | undefined = undefined
	#interval: number

	constructor(cacheReapInterval: number) {
		this.#interval = cacheReapInterval
		this.#startReapLoop()
	}

	add<T>(key: string, val: T) {
		const entry: CacheEntry<T> = {
			createdAt: Date.now(),
			val: val
		}
		this.#cache.set(key, entry)
	}

	get<T>(key: string): T | undefined {
		const entry = this.#cache.get(key)
		if (entry !== undefined) {
			return entry.val
		}
		else {
			return undefined
		}
	}

	#reap() {
		const now = Date.now()
		const expireTime = now - this.#interval
		for (const [k, v] of this.#cache) {
			if (v.createdAt < expireTime) {
				this.#cache.delete(k)
			}
		}
	}

	#startReapLoop() {
		this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval)
	}

	stopReapLoop() {
		clearInterval(this.#reapIntervalId)
		this.#reapIntervalId = undefined
	}
}
