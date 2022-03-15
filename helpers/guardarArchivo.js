const fs = require('fs');
const path='./db/data.json';

const guardarDb = (data)=> {
    fs.writeFileSync(path, JSON.stringify(data))
}

const leerDb =()=> {
    if(!fs.existsSync(path)){
        return null
    }
    const info = fs.readFileSync(path)
    const data = JSON.parse(info)
    return data
}

module.exports = {
    guardarDb,
    leerDb
}