import storageManager from "../functionality/storageManager";

const projectCard = (function () {

    const createProjectIndividualCard = () => {
        const projectCardContainer = document.createElement('div');
        projectCardContainer.classList.add('projectCardContainer'); // not used YET

        const projectInput = document.createElement('input');
        projectInput.type = "text";
        projectInput.name = "projectName";
        projectInput.id = "projectName";

        projectCardContainer.appendChild(projectInput);
        return projectCardContainer;
    }

    const createListTaskCard = (task) => {
        const taskCard = document.createElement('div');
        taskCard.textContent = `${task.getName()} ${task.getDisplayDate()} ${task.getPriority()}`;
        return taskCard;
    }

    const createProjectTaskList = (projectID) => {
        const projectTaskListContainer = document.createElement('div');
        const projectTasks = storageManager.getDataFromStorage("projectTask", 1);
        let taskArray = new Array();

        projectTasks.forEach((oneProjectTask) => {
            if (oneProjectTask.getProjectID() === projectID) {
                taskArray = oneProjectTask.getTaskArray();
            }
        });

        if (taskArray.length > 0) {
            //task array is contains strings, need to map it into numbers for comparison
            taskArray = taskArray.map(Number);
            const tasks = storageManager.getDataFromStorage("tasks", 1);
            tasks.forEach((task) => {
                if (taskArray.includes(task.getID())) {
                    const taskCard = createListTaskCard(task);
                    projectTaskListContainer.appendChild(taskCard);
                }
            });
            return projectTaskListContainer;
        }

    }

    const createProjectCards = (projects, projectContainer) => {
        projects.forEach((oneProject, index) => {
            const projectCard = createProjectIndividualCard();
            projectCard.setAttribute('data-id', index);
            const projectName = projectCard.querySelector('#projectName');

            projectName.value = oneProject.getName();

            const projectTaskListContainer = createProjectTaskList(index);
            if(projectTaskListContainer !== undefined)
                projectCard.appendChild(projectTaskListContainer);

            projectContainer.appendChild(projectCard);
        });
    }


    const loadProjectCard = (content) => {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('projectContainer');

        let projects = storageManager.getDataFromStorage("projects", 1);
        createProjectCards(projects, projectContainer);

        content.appendChild(projectContainer);
    }

    return { loadProjectCard };
})();

export default projectCard;