import formContent from "../pages/formContent";

const taskManager = (function () {
    const addTask = () => {
        formContent.loadFormContent();
    };

    return { addTask };
})();

export default taskManager;

// add task should do more: submitData, insertDataToStorage, updateTaskDOM etc.
// i think all of these should be async (which i dont know yet) because they depend on each other
// they cannot be done at once