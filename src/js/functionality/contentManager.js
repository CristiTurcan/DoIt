import homeContent from "../pages/homeContent";
import projectContent from "../pages/projectContent";
import removeAllChildren from "./removeAllChildren";
import storageManager from "./storageManager";
import taskCard from "../pages/taskCard";
import projectCard from "../pages/projectCard";

const contentManager = (function () {
    const content = document.querySelector('.content');

    const loadHomeContent = () => {
        removeAllChildren(content);
        homeContent.loadHomeContent(content);
        //load task content only if task exists
        if (storageManager.dataExists("tasks")) {
            taskCard.loadTaskCard(content);
        }
    };

    const loadProjectContent = () => {
        removeAllChildren(content);
        projectContent.loadProjectContent(content);
        //load project content only if project exists
        if(storageManager.dataExists("projects")) {
            projectCard.loadProjectCard(content);
        }
    };

    return { loadHomeContent, loadProjectContent };
})();

export default contentManager;