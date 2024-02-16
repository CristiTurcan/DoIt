import task from "./task";
import storageManager from "./storageManager";

const formDataManager = (function () {
    const name = document.querySelector('#name');
    const dueDate = document.querySelector('#dueDate');
    const priority = document.querySelector('#priority');

    const resetForm = () => {
        name.value = '';
        dueDate.value = '';
        priority.value = 'low';
    }

    const isEmpty = () => {
        if (name.value === '' || name.value === undefined) return 1;
        if (dueDate.value === '' || dueDate.value === undefined) return 1;
        if (priority.value === '' || priority.value === undefined) return 1;
        return 0;
    };

    const sendData = () => {
        let oneTask = task(name.value, dueDate.value, priority.value);
        storageManager.populateStorage('tasks', oneTask);
        resetForm();
    };

    return { resetForm, isEmpty, sendData }
})();

export default formDataManager;