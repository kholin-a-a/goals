import React, { useRef } from "react";
import styles from "./ModalOptionComponent.css";
import { ModalOptionButtonComponent } from "./ModalOptionButtonComponent";
import { SafeArea } from "components/SafeArea";

import * as Dom from "helpers/Dom";

export function ModalOptionComponent(props) {
    const $btnContainer = useRef(null);

    if (!props.isOpen) {
        return null;
    }

    const onClick = e => {
        if (Dom.isElementOrItsChild($btnContainer.current, e.target)) {
            return;
        }

        props.onClose();
    }
    
    return (
        <div className={styles.modalOptionComponent} onClick={onClick}>
            <SafeArea>
                <div className={styles.optionsContainer} ref={$btnContainer}>
                    <div>
                        { props.children }
                    </div>

                    <div className={styles.cancelBtn}>
                        <ModalOptionButtonComponent title="Отмена" onClick={props.onClose} />
                    </div>
                </div>
            </SafeArea>
        </div>
    )
}