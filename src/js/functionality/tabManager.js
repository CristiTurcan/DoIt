import contentManager from "./contentManager";
import removeAllChildren from "./removeAllChildren";

const tabManager = (function () {
    const content = document.querySelector('.content');
    const homeBtn = document.querySelector('#home');
    const projectBtn = document.querySelector('#projects');

    const switchTab = () => {
        homeBtn.addEventListener('click', () => {
            removeAllChildren(content);
            contentManager.loadHomeContent(content);
        });

        projectBtn.addEventListener('click', () => {
            removeAllChildren(content);
            contentManager.loadProjectContent(content);
        });
    }

    return { switchTab };
})();

export default tabManager;