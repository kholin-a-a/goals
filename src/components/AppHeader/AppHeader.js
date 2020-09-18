import React from "react";
import styles from "./AppHeader.css";
import { FlatButton } from "components/FlatButton";

export function AppHeader({ title, leftBtn, rightBtn}) {
    return (
        <div className={styles.appHeader}>
            <HeaderButton button={leftBtn} />

            <div className={styles.title}>
                {title}
            </div>

            <HeaderButton button={rightBtn} />
        </div>
    )
}

const HeaderButton = ({ button }) => {
    return (
        <div className={styles.buttonContainer}>
            <FlatButton
                { ...button }
            />
        </div>
    )
}
