import dateManager from "./dateManager";

function task(name, dueDate, priority) {

    //if no priority selected => none
    if (priority === '.') priority = 'none';

    const getName = () => { return name };
    const getDueDate = () => { return dueDate };
    const getPriority = () => { return priority };
    const getDisplayDate = () => {
        return dateManager.displayDate(dueDate);
    }

    const pushToArray = (arr) => {
        arr.push({ name, dueDate, priority });
    }

    return { getName, getDueDate, getPriority, getDisplayDate, pushToArray };
}

export default task;