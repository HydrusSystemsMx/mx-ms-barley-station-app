
var dataStore = window.localStorage;

function setSessionStorage(){
    //first clean data
    cleanData();
    //change type storage
    dataStore = window.sessionStorage;
}


function saveData(name, value){
    dataStore.setItem(name,IsJsonObject(value));
}

function getData(name){
    return IsJsonString(dataStore.getItem(name));
}

function removeData(name){
    dataStore.removeItem(name);
}

function cleanData(){
    window.localStorage.clear();
}

//this function detect id data is a valid JSON
function IsJsonObject(dataValue) {
    try {
        return JSON.stringify(dataValue);
    } catch (e) {
        return dataValue;
    }
}

function IsJsonString(dataValue){
    "use strict";
    try {
        return JSON.parse(dataValue);
    } catch (e) {
        return dataValue;
    }
}