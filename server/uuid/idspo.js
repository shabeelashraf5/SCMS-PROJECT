const uuid = require('uuid');

const prefixspo = "SPO/shebz/"
let counter = 999; 

function genereateCustomSPO(){
    counter++
    return prefixspo + counter
}


module.exports = genereateCustomSPO