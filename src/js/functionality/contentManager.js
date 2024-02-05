import homeContent from "../pages/homeContent";
import projectContent from "../pages/projectContent";

const contentManager = (function () {
    const loadHomeContent = (content) => {
        homeContent.loadHomeContent(content);
    };

    const loadProjectContent = (content) => {
        projectContent.loadProjectContent(content);
    };

    return { loadHomeContent, loadProjectContent };
})();

export default contentManager;