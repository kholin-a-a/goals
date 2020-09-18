import styles from "./SafeArea.css";
import React from "react";

export function SafeArea({ children }) {
    return (
        <div className={styles.safeArea}>
            { children }
        </div>
    )
}