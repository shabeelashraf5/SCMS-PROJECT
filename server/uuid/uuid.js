const uuid = require('uuid');

const prefix = "shebz/";
const prefixspo = "SPO/shebz/"
let counter = 999; 

function generateCustomUUID() {
    counter++;
    return prefix + counter;
}

function genereateCustomSPO(){
    counter++
    return prefixspo + counter
}



module.exports =  generateCustomUUID 