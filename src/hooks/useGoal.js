import { useState } from "react";
import * as Arr from "helpers/Array";

export function useGoal(initial) {
    const [ title, setTitle ] = useState(initial.title);
    const [ keys, setKeys ] = useState(initial.keys);

    const onTitleChange = e => setTitle(e.target.value);
    
    const onKeyTitleChange = (e, index) => {
        const key = {
            ...keys[index],
            title: e.target.value
        };

        setKeys(
            addNewKeys(
                Arr.replace(keys, key, index)
            )
        );
    }

    const onKeyTargetChange = (e, index) => {
        const maxValue = 9999;
        const isEmpty = !e.target.value;
        let value = parseInt(e.target.value);
        if (!isEmpty && (!value || value < 0 || value > maxValue)) {
            return;
        }

        if (isEmpty) {
            value = null;
        }

        const key = {
            ...keys[index],
            target: value
        };

        setKeys(
            addNewKeys(
                Arr.replace(keys, key, index)
            )
        );
    }

    const onKeyTitleBlur = () => {
        setKeys(
            removeEmptyKeys(keys)
        )
    }

    const onKeyTargetBlur = () => {
        setKeys(
            removeEmptyKeys(keys)
        )
    }

    const addNewKeys = (keys) => {
        if (keys.every(key => key.title && key.target)) {
            return [
                ...keys,
                { title: "", target: null }
            ]
        }

        return keys;
    }

    const removeEmptyKeys = (keys) => {
        const reversed = keys.reverse();
        const firstEmptyIndex = reversed.findIndex(key => !key.title && !key.target);

        return reversed
            .filter((key, index) => key.title || key.target || index === firstEmptyIndex)
            .reverse()
            ;
    }

    return {
        ...initial,
        
        title,
        keys,

        onTitleChange,
        onKeyTitleChange,
        onKeyTargetChange,
        onKeyTitleBlur,
        onKeyTargetBlur
    }
}
