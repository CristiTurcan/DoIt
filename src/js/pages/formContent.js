import "../../css/form.css";
import formDataManager from "../functionality/formDataManager";
import contentManager from "../functionality/contentManager";

const formContent = (function () {
    const formContainer = document.querySelector('.formContainer');
    const formContainerPopUp = document.querySelector('.formContainerPopUp');
    const blocker = document.querySelector('.blocker');
    const submitBtn = document.querySelector('.submitBtn');

    const hideFormPopUp = () => {
        formContainerPopUp.style.display = 'none';
    }

    blocker.addEventListener('click', () => {
        formDataManager.resetForm();
        hideFormPopUp();
    });

    const submitData = () => {
        submitBtn.addEventListener('click', (e) => {
            if (!formDataManager.isEmpty()) {
                e.preventDefault();
                formDataManager.sendData();
                hideFormPopUp();
                contentManager.loadHomeContent();
            }
        });
    }

    const loadFormContent = () => {
        blocker.style.display = 'block';
        formContainer.style.display = 'block';
        formContainerPopUp.style.display = 'block';
        submitData();
    };

    return { loadFormContent };
})();

export default formContent;