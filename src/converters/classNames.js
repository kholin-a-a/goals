export function classNames(classNames) {
    return classNames
        .filter(c => !!c)
        .join(" ")
}