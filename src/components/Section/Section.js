import styles from "./Section.css";
import React from "react";

export function Section({ title, children }) {
    return (
        <div className={styles.section}>
            <div className={styles.title}>
                { title }
            </div>

            <div>
                { children }
            </div>
        </div>
    )
}