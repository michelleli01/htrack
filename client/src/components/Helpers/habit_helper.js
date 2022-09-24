import axios from "axios";

// habit occurs on this day
export function occurs(frequency, date) {
    const weekDay = date.day();
    console.log(weekDay);
    var weekDayString = "";

    switch (weekDay) {
        case 0:
            weekDayString = "Sunday";
            break;
        case 1:
            weekDayString = "Monday";
            break;
        case 2:
            weekDayString = "Tuesday";
            break;
        case 3:
            weekDayString = "Wednesday";
            break;
        case 4:
            weekDayString = "Thursday";
            break;
        case 5:
            weekDayString = "Friday";
            break;
        case 6:
            weekDayString = "Saturday";
            break;
        default:
            weekDayString = "";
            console.log("Not proper week day");
    }

    return frequency.indexOf(weekDayString) !== -1;
}

export function done(user_id, habit_id, date) {
    return axios({
        method: "GET",
        withCredentials: true,
        url: `/status/users/${user_id}/habits/${habit_id}/date/${date.format(
            "YYYY-MM-DD"
        )}`,
    }).then((res) => {
        if (res.data.status) {
            if (res.data.status.complete) {
                return true;
            }
        }
        return false;
    });
}
