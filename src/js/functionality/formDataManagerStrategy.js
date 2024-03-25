// tried applying strategy design pattern
// on formDataManager and projectDataManager
const formDataManagerStrategy = (function () {
    let strategy = null;

    const setStrategy = (newStrategy) => {
        strategy = newStrategy;
    }

    const resetForm = (newStrategy) => {
        setStrategy(newStrategy);
        return strategy.resetForm();
    }

    const isEmpty = (newStrategy) => {
        setStrategy(newStrategy);
        return strategy.isEmpty();
    }

    const sendData = (newStrategy) => {
        setStrategy(newStrategy);
        return strategy.sendData();
    }

    return { resetForm, isEmpty, sendData }
})();

export default formDataManagerStrategy;