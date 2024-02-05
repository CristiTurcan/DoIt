const homeContent = (function () {
    const loadHomeContent = (content) => {
        const title = document.createElement('span');
        title.textContent = 'This is Home';

        content.appendChild(title);
    };

    return { loadHomeContent };
})();

export default homeContent