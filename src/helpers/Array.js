export function replace(arr, el, i) {
    return [
        ...arr.slice(0, i),
        el,
        ...arr.slice(i + 1)
    ]
}

export function range(max) {
    return [...Array(max).keys()]
}

export function max(arr, keySelector) {
    const values = arr.map(e => keySelector && keySelector(e) || e);
    
    let max = values[0];
    for(let val of values) {
        if (val > max) {
            max = val;
        }
    }

    return max;
}