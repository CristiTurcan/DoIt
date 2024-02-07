import contentManager from "./contentManager";

const tabManager = (function () {
    const homeBtn = document.querySelector('#home');
    const projectBtn = document.querySelector('#projects');

    //always main tab is home
    contentManager.loadHomeContent();

    const switchTab = () => {
        homeBtn.addEventListener('click', () => {
            contentManager.loadHomeContent();
        });

        projectBtn.addEventListener('click', () => {
            contentManager.loadProjectContent();
        });
    }

    return { switchTab };
})();

export default tabManager;