import styles from "./GoalForm.css";
import React from "react";
import { Input } from "components/Input";
import { Section } from "components/Section";
import { Row } from "components/Row";
import { Repeat } from "components/Repeat";

export function GoalForm(props) {
    const {
        title,
        keys,

        onTitleChange,
        onKeyTitleChange,
        onKeyTargetChange,
        onKeyTitleBlur,
        onKeyTargetBlur
    } = props;

    return (
        <div>
            <Section title="Цель">
                <Row>
                    <Input
                        type="text"
                        placeholder="Введите вашу цель"
                        value={title}
                        onChange={onTitleChange}
                    />
                </Row>
            </Section>

            <Section title="Ключевые показатели">
                <Repeat
                    items={keys}
                    render={(key, i) => (
                        <GoalKeyRow
                            key={i}
                            title={key.title}
                            target={key.target}
                            onTitleChange={e => onKeyTitleChange(e, i)}
                            onTargetChange={e => onKeyTargetChange(e, i)}
                            onTitleBlur={e => onKeyTitleBlur(e, i)}
                            onTargetBlur={e => onKeyTargetBlur(e, i)}
                        />
                    )}
                />
            </Section>
        </div>
    )
}

function GoalKeyRow(props) {
    const {
        title,
        target,

        onTitleChange,
        onTargetChange,
        onTitleBlur,
        onTargetBlur
    } = props;

    return (
        <Row>
            <div>
                <Input
                    type="text"
                    placeholder="Показатель"
                    value={title}
                    onChange={onTitleChange}
                    onBlur={onTitleBlur}
                />
            </div>

            <div className={styles.secondRowInput}>
                <Input
                    type="text"
                    placeholder="Целевое значение"
                    value={target || ""}
                    onChange={onTargetChange}
                    onBlur={onTargetBlur}
                />
            </div>
        </Row>
    )
}