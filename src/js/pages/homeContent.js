import '../../css/home.css';
import taskManager from "../functionality/taskManager";
import storageManager from "../functionality/storageManager";
import task from '../functionality/task';

const homeContent = (function () {

    const createTaskCard = (tasks, taskContainer) => {
        tasks.forEach((task) => {
            const newTask = document.createElement('div');
            newTask.classList.add('taskCard');
            newTask.innerHTML = `Name: ${task.name}<br>DueDate: ${task.dueDate}<br>Priority: ${task.priority}`;
            taskContainer.appendChild(newTask);
        });
    }

    const loadTaskContent = (content) => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');

        let tasks = storageManager.getDataFromStorage("tasks");
        createTaskCard(tasks, taskContainer);
        
        content.appendChild(taskContainer);
    }

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