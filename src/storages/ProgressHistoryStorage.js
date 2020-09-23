const storageKey = "app::progressHistory";

export function read() {
    const json = localStorage.getItem(storageKey);
    if (!json) {
        return [];
    }

    const parsed = JSON.parse(json) || [];

    return parsed.map(h => ({
        ...h,
        date: new Date(h.date)
    }));
}

export function add(goalKey, delta) {
    const history = read();
    
    history.push({
        goalKey,
        delta,
        date: new Date()
    });

    save(history);
}

function save(history) {
    localStorage.setItem(storageKey, JSON.stringify(history))
}