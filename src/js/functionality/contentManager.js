import homeContent from "../pages/homeContent";
import projectContent from "../pages/projectContent";
import removeAllChildren from "./removeAllChildren";
import storageManager from "./storageManager";
import taskContent from "../pages/taskContent";

const contentManager = (function () {
    const content = document.querySelector('.content');

    const loadHomeContent = () => {
        removeAllChildren(content);
        homeContent.loadHomeContent(content);
        //load task content only if task exists
        if (storageManager.dataExists("tasks")) {
            taskContent.loadTaskContent(content);
        }
    };

    const loadProjectContent = () => {
        removeAllChildren(content);
        projectContent.loadProjectContent(content);
    };

    return { loadHomeContent, loadProjectContent };
})();

export default contentManager;