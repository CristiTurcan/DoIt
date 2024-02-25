import task from "./task";
import storageManager from "./storageManager";
import dateManager from "./dateManager";

const formDataManager = (function () {
    const name = document.querySelector('#name');
    const dueDate = document.querySelector('#dueDate');
    const priority = document.querySelector('#priority');
    const dateDisplay = document.querySelector('#dateDisplay');

    dueDate.addEventListener('change', () => {
        dateDisplay.textContent = dateManager.displayDate(dueDate.value);
    });

    const resetForm = () => {
        name.value = '';
        dueDate.value = '';
        priority.value = '.';
        dateDisplay.textContent = 'Choose date';
    }

    const isEmpty = () => {
        if (name.value === '' || name.value === undefined) {
            console.log('formDataManager: name.value is empty');
            return 1;
        }
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