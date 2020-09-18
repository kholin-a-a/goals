import styles from "./GoalsPage.css";
import React, { useEffect, useRef, useState } from "react";
import { AppHeader } from "components/AppHeader";
import { Repeat } from "components/Repeat";
import { ModalOptionComponent, ModalOptionButtonComponent } from "components/ModalOption";
import { Row } from "components/Row";
import { FlatButton } from "components/FlatButton";
import { Section } from "components/Section";
import { Select } from "components/Select";
import { SafeArea } from "components/SafeArea";

import { useHistory } from "react-router-dom";
import { classNames, dateToRecency } from "converters";

import * as goalStorage from "storages/GoalsStorage";
import * as Arr from "helpers/Array";

export function GoalsPage() {
    const goals = useGoals();
    const selectedGoal = useSelectedGoal();
    const selectedKey = useSelectedKey();
    const history = useHistory();

    const createBtn = {
        title: "Создать",
        onClick: () => history.push("/goals/create")
    }

    return (
        <div>
            <AppHeader
                title="Цели"
                rightBtn={createBtn}
            />

            <Repeat
                items={goals}
                render={(goal, index) => (
                    <Goal
                        key={index}
                        goal={goal}
                        onOptions={goal => selectedGoal.select(goal)}
                        onKeyClick={key => selectedKey.select(key)}
                    />
                )}
            />

            <GoalOptions
                isOpen={selectedGoal.goal}
                onClose={selectedGoal.unselect}
                onEditClick={selectedGoal.onEdit}
                onResetClick={selectedGoal.onReset}
                onRemoveClick={selectedGoal.onRemove}
            />

            <GoalKeyValueSelector
                goalKey={selectedKey.key}
                onClose={selectedKey.unselect}
                onSelect={selectedKey.onSelect}
            />
        </div>
    )
}

function useGoals() {
    const [goals, setGoals] = useState(goalStorage.read());

    useEffect(() => {
        const onGoalsChanged = goals => setGoals(goals);

        goalStorage.subscribe(onGoalsChanged);

        return () => {
            goalStorage.unsubscribe(onGoalsChanged);
        }
    })

    return goals;
}

function useSelectedGoal() {
    const [goal, setGoal] = useState(null);
    const history = useHistory();

    const select = goal => setGoal(goal);
    const unselect = () => setGoal(null);

    const onRemove = () => {
        goalStorage.remove(goal);
        unselect();
    }

    const onReset = () => {
        goalStorage.restart(goal);
        unselect();
    }

    const onEdit = () => {
        history.push(`/goals/${goal.id}/edit`);
        unselect();
    }

    return {
        goal,

        select,
        unselect,
        onRemove,
        onReset,
        onEdit
    }
}

function useSelectedKey() {
    const [key, setKey] = useState(null);

    const select = key => setKey(key);
    const unselect = () => setKey(null);

    const onSelect = (value) => {
        goalStorage.setGoalKeyCurrent(key.id, value);
        unselect();
    }

    return {
        key,

        select,
        unselect,
        onSelect
    }
}

const Goal = ({ goal, onOptions, onKeyClick }) => {
    return (
        <div className={styles.goal}>
            <div
                className={styles.title}
                onClick={() => onOptions(goal)}
            >
                {goal.title}
            </div>

            <Repeat
                items={goal.keys}
                render={(key, index) => (
                    <GoalKey
                        key={index}
                        goalKey={key}
                        onClick={() => onKeyClick(key)}
                    />
                )}
            />
        </div>
    )
}

const GoalKey = ({ goalKey, onClick }) => {
    const percantage = (goalKey.current * 100 / goalKey.target);
    const isCompleted = percantage >= 100;

    return (
        <div
            className={classNames([styles.goalKey, isCompleted && styles.completed])}
            onClick={onClick}
        >
            <div>
                <div className={styles.title}>
                    {goalKey.title}
                </div>
                <div className={styles.dateUpdated}>
                    {dateToRecency(goalKey.updated)}
                </div>
            </div>

            <div>
                <div className={styles.results}>
                    {goalKey.current}/{goalKey.target}
                </div>
                <div className={styles.percentage}>
                    {percantage.toFixed()}%
                </div>
            </div>
        </div>
    )
}

const GoalOptions = ({ isOpen, onClose, onEditClick, onRemoveClick, onResetClick }) => {
    return (
        <ModalOptionComponent
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOptionButtonComponent title="Перезапустить" onClick={onResetClick} />
            <ModalOptionButtonComponent title="Редактировать" onClick={onEditClick} />
            <ModalOptionButtonComponent title="Удалить" onClick={onRemoveClick} />
        </ModalOptionComponent>
    )
}

const GoalKeyValueSelector = ({ goalKey, onSelect, onClose }) => {
    const $content = useRef(null);

    if (!goalKey) {
        return null;
    }

    const options = Arr.range(goalKey.target + 10).map(number => ({
        value: number,
        title: number
    }));

    const onClick = e => {
        if (e.target === $content.current || $content.current.contains(e.target)) {
            return
        }

        onClose();
    }

    return (
        <div className={styles.goalKeySelector} onClick={onClick}>
            <div className={styles.goalKeySelectorContent} ref={$content}>
                <SafeArea>
                    <Row>
                        <div className={styles.goalKeySelectorButtonsContainer}>
                            <div className={styles.btnContainer}>
                                <FlatButton
                                    title="-1"
                                    onClick={() => onSelect(goalKey.current - 1)}
                                    disabled={!goalKey.current}
                                />
                            </div>
                            <div className={styles.btnContainer}>
                                <FlatButton
                                    title="✅ Done"
                                    onClick={() => onSelect(goalKey.target)}
                                />
                            </div>
                            <div className={styles.btnContainer}>
                                <FlatButton title="+1"
                                    onClick={() => onSelect(goalKey.current + 1)}
                                />
                            </div>
                        </div>
                    </Row>

                    <Section title="Текущее значение">
                        <Row>
                            <Select
                                value={goalKey.current}
                                onChange={e => onSelect(parseInt(e.target.value))}
                                options={options}
                            />
                        </Row>
                    </Section>
                </SafeArea>
            </div>
        </div>
    )
}
