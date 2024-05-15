const uuid = require('uuid');

const prefix = "shebz/";

function generateCustomUUID() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return prefix + randomNumber;
}


module.exports =  generateCustomUUID 