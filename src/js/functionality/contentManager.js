import homeContent from "../pages/homeContent";
import projectContent from "../pages/projectContent";
import removeAllChildren from "./removeAllChildren";

const contentManager = (function () {
    const content = document.querySelector('.content');

    const loadHomeContent = () => {
        removeAllChildren(content);
        homeContent.loadHomeContent(content);
        homeContent.loadTaskContent(content);
    };

    const loadProjectContent = () => {
        removeAllChildren(content);
        projectContent.loadProjectContent(content);
    };

    return { loadHomeContent, loadProjectContent };
})();

export default contentManager;