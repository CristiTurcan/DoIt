import "../../css/task.css";
import dateManager from "./dateManager";

function task(taskID, name, dueDate, priority) {

    if (priority === '.') priority = 'none';    // if no priority selected => none
    if (dueDate === '') dueDate = 'none';   // if no dueDate selected => none

    const setID = (id) => {taskID = id};
    const getID = () => { return taskID };
    const getName = () => { return name };
    const getDueDate = () => { return dueDate };
    const getPriority = () => { return priority };
    const getDisplayDate = () => { return dateManager.displayDate(dueDate); }

    const pushToArray = (arr) => {
        arr.push({ taskID, name, dueDate, priority });
    }

    return {
        setID, getID, getName, getDueDate,
        getPriority, getDisplayDate, pushToArray
    };
}

export default task;