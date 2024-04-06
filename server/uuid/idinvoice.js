const uuid = require('uuid');

const prefixpo = "INV/shebz/"
let counter = 999; 

function generateCustomInvoice(){
    counter++
    return prefixpo + counter
}


module.exports = generateCustomInvoice