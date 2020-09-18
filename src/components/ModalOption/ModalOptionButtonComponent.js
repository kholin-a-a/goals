import React from "react";
import styles from "./ModalOptionButtonComponent.css";
import { classNames } from "../../converters";

export function ModalOptionButtonComponent(props) {
    return (
        <div
            className={ classNames([ styles.modalOptionButtonComponent, !props.icon && styles.center ]) }
            onClick={props.onClick}
        >
            {
                props.icon ?
                
                <div className={ classNames([ styles.icon ])}>
                </div>

                : null
            }

            <div>
                {props.title}
            </div>
        </div>
    )
}