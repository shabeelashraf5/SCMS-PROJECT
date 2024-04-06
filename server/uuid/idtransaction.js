const uuid = require('uuid');

const prefixpo = "FT/"


function generateCustomTransaction(){
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return prefixpo + randomNumber;
}


module.exports = generateCustomTransaction