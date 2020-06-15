const db = require('../database/dbConfig.js')

module.exports = {
    addUser,
    findBy,
    findUsers
}

function addUser(user) {
    return db('users').insert(user)
}

function findBy(any) {
    return db('users').where(any).orderBy('id')
}

function findUsers() {
    return db('users')
}