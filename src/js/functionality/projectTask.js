// this is making the link between project and which tasks 
// are included in the project

function projectTask(projectID, taskArray) {

    const getProjectID = () => { return projectID; };
    const getTaskArray = () => { return taskArray; };

    const pushToArray = (arr) => {
        arr.push({ projectID, taskArray });
    }

    return {getProjectID, getTaskArray, pushToArray};
}

export default projectTask;