var Environment = require( '../utilities/environtment'  );
function getEnv(){
    return (process.env.NODE_ENV)?process.env.NODE_ENV:"development";
}
function getPath(pkey){
    return Environment[getEnv()];
}
//Return the param x with trim regex applied.
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}
module.exports = { 
    getEnv,getPath,myTrim
}
