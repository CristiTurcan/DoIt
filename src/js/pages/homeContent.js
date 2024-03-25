import taskManager from "../functionality/taskManager";

const homeContent = (function () {

    const loadHomeContent = (content) => {
        const addNewTask = document.createElement('button');
        addNewTask.textContent = 'Add New Task';
        content.appendChild(addNewTask);

        addNewTask.addEventListener('click', () => {
            taskManager.addTask();
        })
    };

    return { loadHomeContent };
})();

export default homeContent