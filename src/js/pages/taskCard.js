import taskManager from "../functionality/taskManager";
import storageManager from "../functionality/storageManager";

const taskCard = (function () {

    const createDeleteButton = () => {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Done';

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
        const taskForm = document.createElement('div');

        var nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'taskName';
        nameInput.id = 'taskName';
        nameInput.required = true;

        var dateContainer = document.createElement('div');
        dateContainer.classList.add('dateContainer');

        var dateDisplay = document.createElement('span');
        dateDisplay.id = 'taskDateDisplay';
        dateDisplay.textContent = 'Choose date ';

        var dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';
        dueDateInput.name = 'taskDueDate';
        dueDateInput.id = 'taskDueDate';

        dateContainer.appendChild(dateDisplay);
        dateContainer.appendChild(dueDateInput);

        var prioritySelect = document.createElement('select');
        prioritySelect.name = 'taskPriority';
        prioritySelect.id = 'taskPriority';

        var defaultOption = document.createElement('option');
        defaultOption.value = '.';
        defaultOption.selected = true;
        defaultOption.disabled = true;
        defaultOption.hidden = true;
        defaultOption.textContent = 'Priority';

        var noneOption = document.createElement('option');
        noneOption.value = 'none';
        noneOption.textContent = 'None';

        var lowOption = document.createElement('option');
        lowOption.value = 'low';
        lowOption.textContent = 'Low';

        var mediumOption = document.createElement('option');
        mediumOption.value = 'medium';
        mediumOption.textContent = 'Medium';

        var highOption = document.createElement('option');
        highOption.value = 'high';
        highOption.textContent = 'High';

        prioritySelect.appendChild(defaultOption);
        prioritySelect.appendChild(noneOption);
        prioritySelect.appendChild(lowOption);
        prioritySelect.appendChild(mediumOption);
        prioritySelect.appendChild(highOption);

        taskForm.appendChild(nameInput);
        taskForm.appendChild(dateContainer);
        taskForm.appendChild(prioritySelect);

        taskForm.classList.add('taskCard');
        return taskForm;
    }

    const createTaskCard = (tasks, taskContainer) => {
        tasks.forEach((oneTask, index) => {
            const newTask = document.createElement('div');
            const taskForm = createTaskForm();
            //get form clone inputs
            const name = taskForm.querySelector('#taskName');
            const dueDate = taskForm.querySelector('#taskDueDate');
            const priority = taskForm.querySelector('#taskPriority');
            const dateDisplay = taskForm.querySelector('#taskDateDisplay');
            newTask.classList.add('taskCard');
            newTask.setAttribute('data-id', oneTask.getID());

            name.value = oneTask.getName();
            dueDate.value = oneTask.getDueDate();
            priority.value = oneTask.getPriority();
            dateDisplay.textContent = oneTask.getDisplayDate();

            //add edit functionality to task card
            editFormInput(name, dueDate, priority, index);

            newTask.appendChild(taskForm);
            newTask.appendChild(createDeleteButton());
            taskContainer.appendChild(newTask);
        });
    };

    const loadTaskCard = (content) => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');

        let tasks = storageManager.getDataFromStorage("tasks", 1);
        createTaskCard(tasks, taskContainer);

        content.appendChild(taskContainer);
    };

    return { loadTaskCard };
})();

export default taskCard;