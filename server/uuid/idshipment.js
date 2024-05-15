const uuid = require('uuid');

const prefixpo = "SHIP/ID/"


function generateCustomShipment(){
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return prefixpo + randomNumber
}


module.exports = generateCustomShipment