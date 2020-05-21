class Constants {
// API KEY
    static get APISecretKey() { return 'Esta é uma chave secreta para a autenticação de tokens. Use uma string aleatória.' }

// API CODES
    static get successCode()        { return 0 }
    static get errorCodeMongoose()  { return 1 }
    static get errorCodeAuth()      { return 2 }
    static get notFound()           { return 3 }

// API DESCRIPTION CODES
    static get successDesc()            { return 'Successo'                   }
    static get notFoundDesc()           { return 'Registro não encontrado'    }
    static get authenticationFailed()   { return 'Usuário ou senha inválidos' }
    static get invalidToken()           { return 'Token inválido'             }
    static get tokenNotFound()          { return 'Token não encontrado'       }

// GENERAL CONSTANTS
    static get minRandomNumber() { return 100000000000 }
    static get maxRandomNumber() { return 999999999999 }
    static get sessionTime()     { return '1h'         }
}

module.exports = Constants