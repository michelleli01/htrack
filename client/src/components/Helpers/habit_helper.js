import moment from "moment";

// habit occurs on this day
export function occurs(frequency, date) {
    const weekDay = date.day();
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
