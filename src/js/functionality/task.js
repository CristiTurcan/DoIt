function task(name, dueDate, priority) {
    const getName = () => { return name };
    const getDueDate = () => { return dueDate };
    const getPriority = () => { return priority };

    const pushToArray = (arr) => {
        arr.push({ name, dueDate, priority });
    }

    return { getName, getDueDate, getPriority, pushToArray };
}

export default task;