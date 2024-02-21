import task from "../functionality/task";
import taskManager from "../functionality/taskManager";
import storageManager from "../functionality/storageManager";

const taskContent = (function () {

    const createDeleteButton = () => {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', () => {
            const id = deleteBtn.parentNode.getAttribute('data-id');
            taskManager.deleteTask(id);
        });

        return deleteBtn;
    }

    const editFormInput = (name, dueDate, priority, index) => {
        name.addEventListener('change', () => {
            taskManager.editTask(index, "name", name.value);
        })

        dueDate.addEventListener('change', () => {
            taskManager.editTask(index, "dueDate", dueDate.value);
        })

        priority.addEventListener('change', () => {
            taskManager.editTask(index, "priority", priority.value);
        })
    }

    const createTaskForm = () => {
        const taskForm = document.querySelector('.formContainer');
        const taskFormClone = taskForm.cloneNode(true);
        taskFormClone.classList.remove('formContainer');
        //here i can add a special class for taskCard Form

        return taskFormClone;
    }

    const createTaskCard = (tasks, taskContainer) => {
        tasks.forEach((oneTask, index) => {
            const newTask = document.createElement('div');
            const taskForm = createTaskForm();
            //get form clone inputs
            const name = taskForm.querySelector('#name');
            const dueDate = taskForm.querySelector('#dueDate');
            const priority = taskForm.querySelector('#priority');
            newTask.classList.add('taskCard');
            newTask.setAttribute('data-id', index);

            //breaks encapsulation - only for frontend - data in localStorage remains the same
            const taskObj = task(oneTask.name, oneTask.dueDate, oneTask.priority);
            name.value = taskObj.getName();
            dueDate.value = taskObj.getDueDate();
            priority.value = taskObj.getPriority();

            editFormInput(name, dueDate, priority, index);

            newTask.appendChild(taskForm);
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

    return { loadTaskContent };
})();

export default taskContent;