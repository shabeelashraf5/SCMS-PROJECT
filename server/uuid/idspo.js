const uuid = require('uuid');

const prefixspo = "SPO/shebz/"

function genereateCustomSPO(){
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return prefixspo + randomNumber
}


module.exports = genereateCustomSPO