import axios from "axios";

//Host del backend de nodejs
function getBackUrl(){
    return "http://localhost:8080";
}
function getHolidaysEndPoint(){
    return getBackUrl() + "/api/v1/holidays/list"; 
}
function getDeleteHolidaysEndPoint(pid){
    return getBackUrl() + "/api/v1/holidays/del/" + pid; 
}
function getSaveHolidaysEndPoint(){
    return getBackUrl() + "/api/v1/holidays/save"; 
}
const deleteHolidays = async (pid) => {
    let url = getDeleteHolidaysEndPoint(pid);        
    return await axios.get(url);
}
const getHolidays = async () => {
    let url = getHolidaysEndPoint();        
    return await axios.get(url);
}
const setHolidays = async (item) => {
    let url = getSaveHolidaysEndPoint();        
    return await axios.post(url,item);
}
//Return the param x with trim regex applied.
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}
export { 
    getHolidays,deleteHolidays,setHolidays,myTrim
}