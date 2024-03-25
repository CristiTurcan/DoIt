import storageManager from "../functionality/storageManager";
import removeAllChildren from "../functionality/removeAllChildren";
import projectFormDataManager from "../functionality/projectFormDataManager";

const projectTaskList = (function () {
    const projectFormContainer = document.querySelector('.projectFormContainer');
    const taskListContainer = projectFormContainer.querySelector('.taskListContainer');

    const isSelected = (container) => {
        const input = container.querySelector('input');
        if(!input.checked) {
            container.classList.remove('isSelected');
            projectFormDataManager.deleteTask(input.id);
        } else {
            container.classList.add('isSelected');
            projectFormDataManager.addTask(input.id);
        }
    }

    const createCheckboxInput = (taskCard, task) => {
        const container = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = task.getID();
        checkbox.name = 'Task' + task.getID();
        checkbox.value = task.getID();

        const label = document.createElement('label');
        label.htmlFor = 'Task' + task.getID();
        label.textContent = `${task.getName()} ${task.getDisplayDate()} ${task.getPriority()}`;

        
        container.appendChild(checkbox);
        container.appendChild(label);
        container.addEventListener('click', () => {
            isSelected(container);
        });
        taskCard.appendChild(container);
    }

    const createTaskCard = (tasks) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('taskList');

        tasks.forEach(task => {
            createCheckboxInput(taskCard, task);
        });
        
        return taskCard;
    }

    const addTasks = () => {
        const tasks = storageManager.getDataFromStorage("tasks", 1);
        const taskCard = createTaskCard(tasks);
        taskListContainer.appendChild(taskCard);
    }

    const resetTaskList = () => {
        removeAllChildren(taskListContainer);
    }

    return { addTasks, resetTaskList };
})();

export default projectTaskList;