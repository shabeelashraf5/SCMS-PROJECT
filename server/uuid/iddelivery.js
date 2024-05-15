const uuid = require('uuid');

const prefixpo = "WH/DN/"


function generateCustomDelivery(){
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return prefixpo + randomNumber
}


module.exports = generateCustomDelivery