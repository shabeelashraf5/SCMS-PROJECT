const uuid = require('uuid');

const prefixpo = "PO/INBI/"


function generateCustomPO(){
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return prefixpo + randomNumber
}


module.exports = generateCustomPO