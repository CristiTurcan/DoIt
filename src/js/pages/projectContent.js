import projectManager from "../functionality/projectManager";

const projectContent = (function () {
    const loadProjectContent = (content) => {
        const addNewProject = document.createElement('button');
        addNewProject.textContent = 'New Project';

        addNewProject.addEventListener('click', () => {
            projectManager.addProject();
        })

        content.appendChild(addNewProject);
    };

    return { loadProjectContent };
})();

export default projectContent;