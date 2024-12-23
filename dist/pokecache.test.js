import { expect, test } from "vitest";
import { Cache } from "./pokecache";
test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(500);
    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);
    console.log('a');
    await new Promise((resolve) => setTimeout(resolve, interval + 100));
    console.log('b');
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);
    cache.stopReapLoop();
});
