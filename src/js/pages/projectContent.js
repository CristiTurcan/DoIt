const projectContent = (function () {
    const loadProjectContent = (content) => {
        const title = document.createElement('span');
        title.textContent = 'This is Projects';

        content.appendChild(title);
    };

    return { loadProjectContent };
})();

export default projectContent;