function cacheFunc(func) {
    const cache = new Map();
    const maxCacheSize = 10;

    return (...args) => {
        for (const key of cache.keys()) {
            if (key.every((currentVal, index) => currentVal === args[index])) {
                return cache.get(args);
            }
        }

        if (cache.size >= maxCacheSize) {
            const firstKey = [...cache.keys()].shift();
            cache.delete(firstKey);
        }

        const result = func(...args);
        cache.set(args, result);
        return result;
    };
}


function getPhrase(firstWord, secondWord) {
    return firstWord + secondWord;
}

const cacheGetPhrase = cacheFunc(getPhrase);
cacheGetPhrase('Hello', 'world');