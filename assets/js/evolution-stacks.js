// Explicit editorial relationships; never infer evolution from similar titles or technology.
(function () {
    function group(items, evolutions) {
        const byId = new Map(items.map(item => [item.id, item]));
        const memberships = new Map();
        for (const evolution of Array.isArray(evolutions) ? evolutions : []) {
            if (!evolution || typeof evolution !== 'object') continue;
            const ids = evolution.itemIds;
            if (!evolution.id || !Array.isArray(ids) || ids.length < 2
                || new Set(ids).size !== ids.length
                || ids.some(id => !byId.has(id) || memberships.has(id))) continue;
            const entry = { id: evolution.id, items: ids.map(id => byId.get(id)) };
            ids.forEach(id => memberships.set(id, entry));
        }
        const emitted = new Set();
        const entries = [];
        for (const item of items) {
            const entry = memberships.get(item.id);
            if (!entry) { entries.push({ items: [item] }); continue; }
            if (emitted.has(entry)) continue;
            emitted.add(entry); entries.push(entry);
        }
        return entries;
    }
    window.EvolutionStacks = { group };
})();
