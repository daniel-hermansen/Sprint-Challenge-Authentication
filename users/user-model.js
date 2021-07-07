const db = require('../database/dbConfig.js')
module.exports = {
    getUsers
}

function getUsers() {
    return db('users').select('id', 'username').orderBy('id')
}