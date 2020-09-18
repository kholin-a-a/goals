export function isElementOrItsChild($el, $other) {
    return $el === $other || $el.contains($other);
}
