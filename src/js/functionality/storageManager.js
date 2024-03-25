import toDoCreator from "./toDoCreator";

const storageAvailability = (function () {
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

    return { storageNotAvailable };
})();

const storageData = (function () {
    const deleteItemFromData = (data, index) => {
        data.splice(index, 1);
    }

    const insertCurrentTaskIntoData = (item, data) => {
        item.pushToArray(data);
        return data;
    }

    const initializeData = (item) => {
        let data = new Array();
        item.pushToArray(data);
        return data;
    }

    const dataToArrayOfObject = (itemName, data) => {
        let arr = new Array();
        data.forEach((oneData) => {
            const toDo = toDoCreator.createToDo(itemName, oneData);
            arr.push(toDo);
        });
        return arr;
    }

    // this function receives data as a JSON, transorms data into array of objects
    // each object from array has it's ID set
    // after setting ID, the object is pushed into an array (JSON FORMAT) so that deletion can get done accordinlgy
    const updateID = (itemName, data) => {
        data = dataToArrayOfObject(itemName, data);
        let newData = new Array();
        data.forEach((oneData, index) => {
            oneData.setID(index);
            oneData.pushToArray(newData);
        })
        return newData;
    }

    return {
        deleteItemFromData, insertCurrentTaskIntoData,
        initializeData, dataToArrayOfObject, updateID
    };
})()

const storageManager = (function (storageAvailability, storageData) {

    const insertDataIntoStorage = (itemName, data) => {
        data = JSON.stringify(data);
        localStorage.setItem(itemName, data);
    };

    const dataExists = (itemName) => {
        let data = localStorage.getItem(itemName);
        if (data) return 1;
        return 0;
    };

    // if you want data as array of objects: asArray: 1
    // if you want data as JSON: asArray: 0
    const getDataFromStorage = (itemName, asArray) => {
        if(asArray === undefined)
            throw new Error("storageManager:getDataFromStorage: asArray is undefined");
        let data = localStorage.getItem(itemName);
        if (data) {
            data = JSON.parse(data);
            if(asArray === 1)
                data = storageData.dataToArrayOfObject(itemName, data);
            return data;
        }
        return;
    };

    const populateStorage = (itemName, item) => {
        if (storageAvailability.storageNotAvailable()) return;

        let data = getDataFromStorage(itemName, 0);

        //check if there is existing data
        if (data) {
            data = storageData.insertCurrentTaskIntoData(item, data);
            insertDataIntoStorage(itemName, data);
        } else {
            data = storageData.initializeData(item);
            insertDataIntoStorage(itemName, data);
        }
    };

    const deleteItem = (itemName, index) => {
        let data = getDataFromStorage(itemName, 0);
        if (data) {
            if (data.length === 1) {
                localStorage.clear();
            }
            else {
                storageData.deleteItemFromData(data, index);
                data = storageData.updateID(itemName, data);
                insertDataIntoStorage(itemName, data);
            }
        }
    };

    const editItem = (itemName, index, oldValueType, newValue) => {
        let data = getDataFromStorage(itemName, 0);
        if (data) {
            data[index][oldValueType] = newValue;
            insertDataIntoStorage(itemName, data);
        }
    };

    return { dataExists, populateStorage, getDataFromStorage, deleteItem, editItem };
})(storageAvailability, storageData);

export default storageManager;