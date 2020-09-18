import styles from "./FlatButton.css";
import React from "react";

export function FlatButton(props) {
    return (
        <button
            className={styles.flatButton}
            {...props}
        >
            {props.title}
        </button>
    )
}