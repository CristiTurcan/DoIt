import { formatDistanceToNowStrict, format, isPast, isToday, isTomorrow, isYesterday, isThisYear } from "date-fns";

const dateManager = (function () {

    const getDay = (dueDate) => {
        const date = new Date(dueDate);
        if(isThisYear(dueDate)) {
            return format(date, 'EEE, dd MMM');
        }
        else {
            return format(date, 'EEE, dd MMM yyyy');
        }
    }

    const emptyDate = (dueDate) => {
        if (dueDate === 'none')
            return 1;
        return 0;
    }

    const displayDate = (dueDate) => {
        if (emptyDate(dueDate)) return 'None';

        const date = new Date(dueDate);
        let displayDate = '';
        
        if (isYesterday(date)) {
            return "Yesterday";
        } else if (isToday(date)) {
            return "Today";
        } else if (isTomorrow(date)) {
            return "Tomorrow"
        } else if (isPast(date)) {
            displayDate = formatDistanceToNowStrict(date, {addSuffix: true});
            return displayDate;
        } else {
            return getDay(dueDate);
        }
    }

    return { displayDate }
})();

export default dateManager;