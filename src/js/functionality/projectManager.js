import formContent from "../pages/formContent";
import projectCard from "../pages/projectCard";

const projectManager = (function () {

    const addProject = () => {
        formContent.loadFormContent(1);
    }

    return { addProject };
})();

export default projectManager