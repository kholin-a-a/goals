import * as Arr from "helpers/Array";

export function sortGoalsByDate(goals) {
    return [ ...goals ]
        .sort((a, b) => {
            const aUpdated = Arr.max(a.keys, k => k.updated);
            const bUpdated = Arr.max(b.keys, k => k.updated);

            return aUpdated > bUpdated ? -1 : aUpdated < bUpdated ? 1 : 0;
        })
}