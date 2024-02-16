import '../../css/home.css';
import taskManager from "../functionality/taskManager";
import storageManager from "../functionality/storageManager";
import task from '../functionality/task';

const homeContent = (function () {

    const createDeleteButton = () => {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', () => {
            const id = deleteBtn.parentNode.getAttribute('data-id');
            taskManager.deleteTask(id);
        });

        return deleteBtn;
    }

    const createTaskCard = (tasks, taskContainer) => {
        tasks.forEach((oneTask, index) => {
            const newTask = document.createElement('div');
            newTask.classList.add('taskCard');
            newTask.setAttribute('data-id', index);

            const taskObj = task(oneTask.name, oneTask.dueDate, oneTask.priority);
            newTask.innerHTML = taskObj.toString();

            newTask.appendChild(createDeleteButton());
            taskContainer.appendChild(newTask);
        });
    };

    const loadTaskContent = (content) => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');

        let tasks = storageManager.getDataFromStorage("tasks");
        createTaskCard(tasks, taskContainer);

        content.appendChild(taskContainer);
    };

    const loadHomeContent = (content) => {
        const addNewTask = document.createElement('button');
        addNewTask.textContent = 'Add New Task';
        content.appendChild(addNewTask);

        addNewTask.addEventListener('click', () => {
            taskManager.addTask();
        })
    };

    return { loadHomeContent, loadTaskContent };
})();

export default homeContent