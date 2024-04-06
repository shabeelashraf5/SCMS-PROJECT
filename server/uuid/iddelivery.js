const uuid = require('uuid');

const prefixpo = "WH/DN/"
let counter = 999; 

function generateCustomDelivery(){
    counter++
    return prefixpo + counter
}


module.exports = generateCustomDelivery