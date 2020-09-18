import styles from "./Select.css";
import React from "react";

export function Select(props) {
    return (
        <select
            className={styles.select}
            {...props}
        >
            {
                props.options.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.title}
                    </option>
                ))
            }
        </select>
    )
}