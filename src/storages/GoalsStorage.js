import * as Rand from "helpers/Random";

const storageKey = "app::goals";
const subscriptions = [];

export function read(id) {
    const json = localStorage.getItem(storageKey);
    let parsed = json && JSON.parse(json) || [];

    parsed = parsed.map(goal => ({
        ...goal,
        keys: goal.keys.map(key => ({
            ...key,
            updated: new Date(key.updated)
        }))
    }))

    if (!id) {
        return parsed;
    }

    return parsed.find(g => g.id === id);
}

export function add(goal) {
    const goals = read();

    goals.push({
        ...goal,
        id: nextId(),
        keys: goal.keys
            .filter(key => key.title && key.target)
            .map(key => ({
                ...key,
                id: nextId(),
                current: 0,
                updated: new Date()
            }))
    });

    save(goals);
    notify();
}

export function update(goal) {
    let goals = read();

    const index = goals.findIndex(g => g.id === goal.id);
    if (index < 0) {
        return;
    }

    goals = [
        ...goals.slice(0, index),
        {
            ...goal,
            keys: goal.keys
                .filter(key => key.title && key.target)
                .map(key => ({
                    ...key,
                    id: key.id || nextId(),
                    current: key.current || 0,
                    updated: new Date()
                }))
        },
        ...goals.slice(index + 1)
    ];

    save(goals);
    notify();
}

export function remove(goal) {
    let goals = read();

    goals = goals.filter(g => g.id !== goal.id);

    save(goals);
    notify();
}

export function restart(goal) {
    let goals = read();

    const index = goals.findIndex(g => g.id === goal.id);
    if (index < 0) {
        return;
    }

    const _goal = goals[index];
    _goal.keys = _goal.keys.map(key => ({
        ...key,
        target: key.current > key.target ? key.current : key.target,
        current: 0
    }));

    goals[index] = _goal;
    save(goals);
    notify();
}

export function setGoalKeyCurrent(keyId, current) {
    let goals = read();

    for (let goal of goals) {
        const key = goal.keys.find(key => key.id === keyId);

        if (!key) {
            continue;
        } else {
            key.current = current;
            key.updated = new Date();
            break;
        }
    }

    save(goals);
    notify();
}

export function subscribe(callback) {
    subscriptions.push(callback);
}

export function unsubscribe(callback) {
    const index = subscriptions.indexOf(callback);

    if (index >= 0) {
        subscriptions.splice(index, 1);
    }
}

function nextId() {
    return Rand.string(12);
}

function notify() {
    let goals = read();

    for (let callback of subscriptions) {
        callback(goals);
    }
}

function save(goals) {
    localStorage.setItem(storageKey, JSON.stringify(goals));
}