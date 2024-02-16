function task(name, dueDate, priority) {

    const getName = () => { return name };
    const getDueDate = () => { return dueDate };
    const getPriority = () => { return priority };

    const pushToArray = (arr) => {
        arr.push({ name, dueDate, priority });
    }

    const toString = () => {
        return `Name: ${name}\n DueDate: ${dueDate}\n Priority:${priority}`;
    }

    return { getName, getDueDate, getPriority, pushToArray, toString };
}

export default task;