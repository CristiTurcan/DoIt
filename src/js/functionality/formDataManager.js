import storageManager from "./storageManager";
import dateManager from "./dateManager";
import toDoCreator from "./toDoCreator";

const formDataManager = (function () {
    const name = document.querySelector('#name');
    const dueDate = document.querySelector('#dueDate');
    const priority = document.querySelector('#priority');
    const dateDisplay = document.querySelector('#dateDisplay');

    dueDate.addEventListener('change', () => {
        dateDisplay.textContent = dateManager.displayDate(dueDate.value);
    });

    const getTaskID = () => {
        // new task ID is length of data from storage
        let id = storageManager.getDataFromStorage('tasks', 1);
        if (id === undefined)
            return 0;
        return id.length;
    }

    const resetForm = () => {
        name.value = '';
        dueDate.value = '';
        priority.value = '.';
        dateDisplay.textContent = 'Choose date';
    }

    const isEmpty = () => {
        if (name.value === '' || name.value === undefined) {
            console.log("NAME ESTE EMPTY!!!");
            return 1;
        }
        return 0;
    };

    const sendData = () => {
        const id = getTaskID();
        let oneTask = toDoCreator.createToDo('tasks', { taskID: id, name: name.value, dueDate: dueDate.value, priority: priority.value });
        storageManager.populateStorage('tasks', oneTask);
        resetForm();
    };

    return { resetForm, isEmpty, sendData }
})();

export default formDataManager;