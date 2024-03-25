import task from "./task";
import project from "./project";
import projectTask from "./projectTask";

// this is used in storageManager, 
// to use only one function when creating objects with data from storage
// rather than doing type-checking in the function
// tried applying factory design pattern
const toDoCreator = (function () {
    const creators = {
        'tasks': (oneData) => task(oneData.taskID, oneData.name, oneData.dueDate, oneData.priority),
        'projects': (oneData) => project(oneData.projectID, oneData.name),
        'projectTask': (oneData) => projectTask(oneData.projectID, oneData.taskArray),
    };

    const createToDo = (itemName, oneData) => {
        if(creators[itemName]) {
            return creators[itemName](oneData);
        }
        else 
            console.log("Error: toDoCreator.createToDo(): itemName not defined");
    }

    return { createToDo };
})();

export default toDoCreator;