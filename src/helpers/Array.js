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
