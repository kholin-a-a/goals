export function nonArchivedGoals(goals) {
    return goals.filter(goal => !goal.archived)
}
