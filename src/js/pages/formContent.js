import "../../css/form.css";
import contentManager from "../functionality/contentManager";
import projectTaskList from "./projectTaskList";
import formDataManager from "../functionality/formDataManager";
import projectFormDataManager from "../functionality/projectFormDataManager";
import formDataManagerStrategy from "../functionality/formDataManagerStrategy";

//formContent is common for both task and project
//it handles the pop-up and submit data functionality
//the task and project forms are different, but functionality is the same
const formContent = (function () {
    // common
    const formContainerPopUp = document.querySelector('.formContainerPopUp');
    const blocker = document.querySelector('.blocker');
    // task form
    const formContainer = document.querySelector('.formContainer');
    const submitBtn = document.querySelector('.submitBtn');
    // project form
    const projectFormContainer = document.querySelector('.projectFormContainer');
    const projectSubmitBtn = document.querySelector('.projectSubmitBtn');

    const hideFormPopUp = () => {
        formContainerPopUp.style.display = 'none';
    }

    blocker.addEventListener('click', () => {
        formDataManagerStrategy.resetForm(formDataManager);
        formDataManagerStrategy.resetForm(projectFormDataManager);
        hideFormPopUp();
    });

    const submitData = () => {
        submitBtn.addEventListener('click', (e) => {
            if (!formDataManagerStrategy.isEmpty(formDataManager)) {
                e.preventDefault();
                formDataManagerStrategy.sendData(formDataManager);
                hideFormPopUp();
                contentManager.loadHomeContent();
            }
        });
    };

    const submitProjectData = () => {
        projectSubmitBtn.addEventListener('click', (e) => {
            if (!projectFormDataManager.isEmpty()) {
                e.preventDefault();
                formDataManagerStrategy.sendData(projectFormDataManager);
                hideFormPopUp();
                contentManager.loadProjectContent();
            }
        })
    }

    //value = 0 - task / 1 - project
    const loadFormContent = (value) => {
        blocker.style.display = 'block';
        formContainerPopUp.style.display = 'block';
        if (value === 0) {
            formContainer.style.display = 'block';
            projectFormContainer.style.display = 'none';
            submitData();
        } else if (value === 1) {
            formContainer.style.display = 'none';
            projectFormContainer.style.display = 'block';
            projectTaskList.addTasks();
            submitProjectData();
        } else
            console.log('No value in formContent: loadFormContent()');
    };

    return { loadFormContent };
})();

export default formContent;