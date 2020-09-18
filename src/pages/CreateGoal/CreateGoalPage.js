import React from "react";
import { AppHeader } from "components/AppHeader";
import { GoalForm } from "components/GoalForm";
import { useHistory } from "react-router-dom";
import { useGoal } from "hooks/useGoal";
import * as goalStorage from "storages/GoalsStorage";

const emptyGoal = {
    title: "",
    keys: [
        { title: "", target: null }
    ]
}

export function CreateGoalPage() {
    const goal = useGoal(emptyGoal);
    const history = useHistory();

    const leftBtn = {
        title: "Назад",
        onClick: () => history.push("/")
    }

    const rightBtn = {
        title: "Создать",
        disabled: !goal.title,
        
        onClick: () => {
            goalStorage.add(goal);
            history.push("/");
        }
    }

    return (
        <div>
            <AppHeader
                title="Новая цель"
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
