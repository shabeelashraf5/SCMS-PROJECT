const uuid = require('uuid');

const prefixpo = "SHIP/ID/"
let counter = 999; 

function generateCustomShipment(){
    counter++
    return prefixpo + counter
}


module.exports = generateCustomShipment