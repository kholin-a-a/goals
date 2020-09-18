export function dateToRecency(date) {
    const now = new Date();
    let dif = now - date;

    let seconds = dif / 1000;
    if (seconds <= 60) {
        return `${seconds.toFixed()} сек назад`
    }

    let minutes = seconds / 60;
    if (minutes <= 60) {
        return `${minutes.toFixed()} мин назад`
    }

    let hours = minutes / 60;
    if (hours <= 24) {
        return `${hours.toFixed()} ч назад`
    }

    let days = hours / 24;
    return `${days.toFixed()} д назад`
}