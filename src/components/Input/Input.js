import React from "react";
import styles from "./Input.css";

export function Input(props) {
    return (
        <input
            className={styles.input}
            {...props}
        />
    )
}