const uuid = require('uuid');

const prefixpo = "INV/shebz/"


function generateCustomInvoice(){
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return prefixpo + randomNumber
}


module.exports = generateCustomInvoice