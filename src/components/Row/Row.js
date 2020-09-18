import styles from "./Row.css";
import React from "react";

export function Row({ children }) {
    return (
        <div className={styles.row}>
            { children }
        </div>
    )
}