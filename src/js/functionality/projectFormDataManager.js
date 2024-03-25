import projectTaskList from "../pages/projectTaskList";
import storageManager from "./storageManager";
import toDoCreator from "./toDoCreator";

const projectFormDataManager = (function () {
    const projectName = document.querySelector('#projectName');
    let tasks = new Array();

    const addTask = (id) => {
        tasks.push(id);
        console.log(tasks);
    }

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task !== id);
    }

    const getProjectID = () => {
        // new project ID is length of data from storage
        let id = storageManager.getDataFromStorage('projects', 1);
        if (id === undefined)
            return 0;
        return id.length;
    }

    const resetForm = () => {
        projectName.value = '';
        tasks = [];
        projectTaskList.resetTaskList();
    }
    
    const isEmpty = () => {
        if (projectName.value === '' || projectName.value === undefined) {
            console.log("PROJECT NAME ESTE EMPTY!!!!");
            return 1;
        }
        return 0;
    }

    const sendData = () => {
        const id = getProjectID();
        const oneProjectTask = toDoCreator.createToDo('projectTask', {projectID: id, taskArray: tasks});
        const oneProject = toDoCreator.createToDo('projects', {projectID: id, name: projectName.value});
        storageManager.populateStorage('projects', oneProject);
        storageManager.populateStorage('projectTask', oneProjectTask);
        resetForm();
    }

    return { addTask, deleteTask, getProjectID, resetForm, isEmpty, sendData };
})();

export default projectFormDataManager;