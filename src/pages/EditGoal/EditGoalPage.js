import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppHeader } from "components/AppHeader";
import { GoalForm } from "components/GoalForm";
import { useGoal } from "hooks/useGoal";
import * as goalsStorage from "storages/GoalsStorage";

export function EditGoalPage() {
    const params = useParams();
    const history = useHistory();

    const initialGoal = intitialGoalState(params.id);
    if (!initialGoal) {
        history.push("/");
        return null;
    }

    const goal = useGoal(initialGoal);

    const leftBtn = {
        title: "Назад",
        onClick: () => history.push("/")
    }

    const rightBtn = {
        title: "Сохранить",
        disabled: !goal.title,
        onClick: () => {
            goalsStorage.update(goal);
            history.push("/");
        }
    }

    return (
        <div>
            <AppHeader
                title="Редактировать"
                leftBtn={leftBtn}
                rightBtn={rightBtn}
            />

            <GoalForm
                title={goal.title}
                keys={goal.keys}

                onTitleChange={goal.onTitleChange}
                onKeyTitleChange={goal.onKeyTitleChange}
                onKeyTargetChange={goal.onKeyTargetChange}
                onKeyTitleBlur={goal.onKeyTitleBlur}
                onKeyTargetBlur={goal.onKeyTargetBlur}
            />
        </div>
    )
}

function intitialGoalState(id) {
    const existenGoal = goalsStorage.read(id);
    if (!existenGoal) {
        return null;
    }

    existenGoal.keys = [
        ...existenGoal.keys,
        { title: "", target: null }
    ];

    return existenGoal;
}