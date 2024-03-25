import formContent from "../pages/formContent";
import storageManager from "./storageManager";
import contentManager from "./contentManager";

const taskManager = (function () {
    
    const addTask = () => {
        formContent.loadFormContent(0);
    };

    const deleteTask = (index) => {
        storageManager.deleteItem("tasks", index);
        contentManager.loadHomeContent();
    };

    const editTask = (index, oldValueType, newValue) => {
        if(newValue !== '' && newValue !== undefined)
            storageManager.editItem("tasks", index, oldValueType, newValue);
        contentManager.loadHomeContent();
    };

    return { addTask, deleteTask, editTask };
})();

export default taskManager;

// add task should do more: submitData, insertDataToStorage, updateTaskDOM etc.
// i think all of these should be async (which i dont know yet) because they depend on each other
// they cannot be done at once