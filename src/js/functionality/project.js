import '../../css/project.css';

function project(projectID, name) {
    const tasks = new Array();

    const setID = (id) => { projectID = id };
    const getID = () => { return projectID };
    const getName = () => { return name };

    const pushToArray = (arr) => {
        arr.push({ projectID, name });
    }

    return { setID, getID, getName, pushToArray };
}

export default project;