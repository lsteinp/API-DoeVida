const constants = require('../config/contants')
const models        = require('../models/index')

const UserModel = models['Users']

/*
 * Retorna todos os usuários no banco
 */
function fetchUsers(orderQuery, whereQuery, callback) {
    const where = createWhereClause(whereQuery)
    const order = createOrderClause(orderQuery)

    UserModel.find(where).sort(order).exec((error, users) => {
        if(error) {
            let errorObj = { statusDesc: error, statusCode: constants.errorCodeMongoose }
            return callback(errorObj, null)
        }
        callback(null, users)
        return
    })
}

/*
 * Retorna o usuário com o id especificado
 */
function findUser(id, callback) {
    UserModel
    .findById(id, /*'+password -salt',*/ (error, user) => { // ativar +password indica que ira vir com a senha, -salt para não incluir o sal na consulta    
        if(error) {
            let errorObj = { statusDesc: error, statusCode: constants.errorCodeMongoose }
            return callback(errorObj, null)
        }
        if(!user) {
            // não há usuário com este id
            let errorObj = { statusDesc: constants.notFoundDesc, statusCode: constants.notFound }
            return callback(errorObj, null)
        }
        callback(null, user)
        return
    })
}

/*
 * Adiciona um usuário ao banco
 */
function addUser(user, callback) {
    const newUser = new UserModel(user)
    newUser.save((error, user) => {
        if(user) {
            return callback(null, user)
        } else {
            callback(error, null)
            return
        }
    })
}

/*
 * Modifica um usuário no banco
 */
function updateUser(newUserData, callback) {
    // No banco é _id e não id!
    const id = newUserData._id 
        ?  newUserData._id
        : newUserData.id

    if(!id) {
        let errorObj = { statusDesc: constants.notFoundDesc + '. Nenhum id foi fornecido!', statusCode: constants.notFound }
        return callback(errorObj, null)
    }
    
    UserModel
    .findByIdAndUpdate(newUserData._id, newUserData, (error, user) => {
        if(error) {
            let errorObj = { statusDesc: error, statusCode: constants.errorCodeMongoose }
            return callback(errorObj, null)
        }
        if(!user) {
            let errorObj = { statusDesc: constants.notFoundDesc, statusCode: constants.notFound }
            return callback(errorObj, null)
        } else {
            callback(null, user)
            return
        }
    })
}

/*
 * Deleta um usuário do banco
 */
function deleteUser(id, callback) {
    UserModel
    .findByIdAndRemove(id, (error, user) => {
        if(error) {
            return callback(error, null)
        }
        if(!user) {
            let errorObj = { statusDesc: constants.notFoundDesc, statusCode: constants.notFound }
            return callback(errorObj, null)
        } else {
            callback(null, user)
        }
    })
}

function createOrderClause(query) {  
    // Algoritmo para Sort de field unico, na controller monta-se a query para que ela seja transformada aqui.
    // Se quiserem sort de multiplos fields ver documentação do Mongoose e adaptar
    return {[query.field]: query.isAscending}
}

function createWhereClause(query) {
    if(query.contains !== undefined) {
        query.$or = [
            // equivalente à new RegExp(query.contains, "i")
            { name:      { $regex: `${query.contains}`, $options: 'i'  }},
            { username:  { $regex: `${query.contains}`, $options: 'i'  }},
            { email:     { $regex: `${query.contains}`, $options: 'i'  }},
        ]
    }
    delete query.contains

    return query
}

module.exports.fetchUsers = fetchUsers
module.exports.findUser   = findUser
module.exports.addUser    = addUser
module.exports.deleteUser = deleteUser
module.exports.updateUser = updateUser
