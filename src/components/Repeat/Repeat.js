import React from "react";

export function Repeat({ items, render }) {
    if (!items) {
        return null;
    }

    return (
        <div>
            { items.map(render) }
        </div>
    )
}