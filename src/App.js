import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { GoalsPage } from "./pages/Goals";
import { CreateGoalPage } from "./pages/CreateGoal";
import { SafeArea } from "components/SafeArea";
import { EditGoalPage } from "./pages/EditGoal";

export function App() {
    return (
        <SafeArea>
            <Router>
                <Switch>
                    <Route path="/goals/create">
                        <CreateGoalPage />
                    </Route>

                    <Route path="/goals/:id/edit">
                        <EditGoalPage />
                    </Route>

                    <Route path="/">
                        <GoalsPage />
                    </Route>
                </Switch>
            </Router>
        </SafeArea>
    )
}