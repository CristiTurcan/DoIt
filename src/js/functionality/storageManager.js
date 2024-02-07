const storageManager = (function () {
    const storageAvailable = (type) => {
        let storage;
        try {
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                // everything except Firefox
                (e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === "QuotaExceededError" ||
                    // Firefox
                    e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
            );
        }
    }

    const storageNotAvailable = () => {
        if (storageAvailable("localStorage") !== true) {
            alert('LocalStorage not available - cannot use app');
            return 1;
        }
        return 0;
    }

    const dataExists = (itemName) => {
        let data = localStorage.getItem(itemName);
        if (data) return 1;
        return 0;
    }

    const getExistingDataFromStorage = (itemName) => {
        let data = localStorage.getItem(itemName);
        if (data) return data;
        return;
    }

    const insertCurrentTaskIntoData = (item, data) => {
        //string array -> array of object/s
        data = JSON.parse(data);
        //add another array (array of object)
        item.pushToArray(data);
        return data;
    }

    const insertDataIntoStorage = (itemName, data) => {
        localStorage.setItem(itemName, JSON.stringify(data));
    }

    const initializeArray = (item) => {
        const itemArray = new Array();
        item.pushToArray(itemArray);
        return itemArray
    }


    const populateStorage = (itemName, item) => {
        if (storageNotAvailable()) return;

        let data = getExistingDataFromStorage(itemName);

        //check if there is existing data
        if (data) {
            data = insertCurrentTaskIntoData(item, data);
            insertDataIntoStorage(itemName, data);
        } else {
            const itemArray = initializeArray(item);
            insertDataIntoStorage(itemName, itemArray);
        }
    }

    const getDataFromStorage = (itemName) => {
        let data = getExistingDataFromStorage(itemName);
        if (data) {
            data = JSON.parse(data);
            return data;
        }
    }

    const deleteItem = (itemName, index) => {
        let data = getExistingDataFromStorage(itemName);
        if (data) {
            data = JSON.parse(data);

            if (data.length === 1){
                console.log('este singurul element');
                localStorage.clear();
            }
            else {
                data.splice(index, 1);
                insertDataIntoStorage(itemName, data);
            }
        }
    }

    return { dataExists, populateStorage, getDataFromStorage, deleteItem };
})();

export default storageManager;