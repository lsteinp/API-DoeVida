const constants = require('../config/contants')
const DAO       = require('../DAO/UsersDAO')
const sha256    = require('sha256')

class UserController {
    /*  Fetch Users:
     *  Retorna uma lista de usuários
     */
    static fetchUsers(query, callback) {
        const orderQuery = UserController.constructOrderQuery(query)
        const whereQuery = UserController.constructWhereQuery(query)
        
        return DAO.fetchUsers(orderQuery, whereQuery, callback)
    }

    /*  Find User:
     *  Retorna um único usuário
     */
    static findUser(idUser, callback) {
        return DAO.findUser(idUser, callback)
    }

    /*  Add User:
     *  Cria um novo usuário, e retorna-o
     */
    static addUser(newUserData, callback) {

        //Gera um salt aleatório
        let salt = UserController.randomSHA256(constants.minRandomNumber, constants.maxRandomNumber)

        //Atualiza os campos do salt e password que serão gravados no banco de dados.
        newUserData.salt = salt
        newUserData.password = sha256(newUserData.password + salt)

        DAO.addUser(newUserData, callback)
    }

    static updateUser(userDataToUpdate, callback) {
        DAO.updateUser(userDataToUpdate, callback)
    }

    static deleteUser(idUser, callback) {
        DAO.deleteUser(idUser, callback)
    }

    static constructOrderQuery(query) {
         /**
         * Construção do ORDER BY:
         * 
         * isAscending: Define se a ordenação será ascendente ou descendente. (ASC ou DESC)
         * field: Define por qual atributo da tabela a esquisa será ordenada. Possíveis valores:
         *  id:       id_user
         *  name:     name
         *  username: username 
         *  email:    email
         *  created:  createdAt
         *  updated:  updatedAt
         * 
         *  Verifique a coleção do postman para um exemplo de uso desses campos.
         */
        let orderQuery = {}

        //Definição do valor de isAscending. Por padrão é ASC (Ascendente), se falso será DESC (Descendente).
        orderQuery.isAscending = query.isAscending === 'false'? '-1' : '1'

        switch(query.sort) {
            case '_id':
                orderQuery.field = '_id'
                break

            case 'id':
                orderQuery.field = '_id'
                break

            case 'name':
                orderQuery.field = 'name'
                break

            case 'username':
                orderQuery.field = 'username'
                break

            case 'email':
                orderQuery.field = 'email'
                break

            case 'created':
                orderQuery.field = 'createdAt'
                break

            case 'updated':
                orderQuery.field = 'updatedAt'
                break

            default: //Campo padrão da ordenação
                orderQuery.field = 'createdAt'
        }

        return orderQuery
    }

    static constructWhereQuery(query) {
        /** 
         * Construição do WHERE:
         * 
         * Possíveis parâmentros:
         * contains: procura pela string informada em todos os campos especificados na função constructWhereClause(), no arquivo UsersDAO.js
         * 
         * Verifique a coleção do postman para um exemplo de uso desse campo.
         */
        let whereQuery = {}
        if(query.contains !== undefined) {
            whereQuery.contains = query.contains
        }

        return whereQuery
    }

    static randomSHA256(low, high) {
        return sha256(UserController.randomInt(low, high))
    }

    static randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low).toString()
    }
}

module.exports = UserController