export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(cacheReapInterval) {
        this.#interval = cacheReapInterval;
        this.#startReapLoop();
    }
    add(key, val) {
        const entry = {
            createdAt: Date.now(),
            val: val
        };
        this.#cache.set(key, entry);
    }
    get(key) {
        const entry = this.#cache.get(key);
        if (entry !== undefined) {
            return entry.val;
        }
        else {
            return undefined;
        }
    }
    #reap() {
        const now = Date.now();
        const expireTime = now - this.#interval;
        for (const [k, v] of this.#cache) {
            if (v.createdAt < expireTime) {
                this.#cache.delete(k);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
