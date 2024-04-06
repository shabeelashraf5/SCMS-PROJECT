const uuid = require('uuid');

const prefixpo = "PO/shebz/"
let counter = 999; 

function generateCustomPO(){
    counter++
    return prefixpo + counter
}


module.exports = generateCustomPO