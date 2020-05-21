import sha256 from 'sha256'
import { Query, ControllerResponse } from './index'
import { container } from '../container'
import Container from '../container'

export default class UserController {
  container: Container

  constructor() {
    this.container = container
  }

  /*  Fetch Users:
   *  Retorna uma lista de usuários
   */
  fetchUsers(query: any): Promise<ControllerResponse> {
    const orderQuery = this.constructOrderQuery(query)
    const whereQuery = this.constructWhereQuery(query)
    return this.container.usersDAO.fetchUsers(orderQuery, whereQuery)
  }

  /*  Find User:
   *  Retorna um único usuário
   */
  findUser(idUser: string): Promise<ControllerResponse> {
    return this.container.usersDAO.findUser(idUser)
  }

  findUserByEmail(email: string): Promise<ControllerResponse> {
    return this.container.usersDAO.findUserByEmail(email)
  }

  updateUser(userDataToUpdate: any): Promise<ControllerResponse> {
    return this.container.usersDAO.updateUser(userDataToUpdate)
  }

  deleteUser(idUser: string): Promise<ControllerResponse> {
    return this.container.usersDAO.deleteUser(idUser)
  }

  constructOrderQuery(query: Query): any {
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
    const orderQuery = {
      //Definição do valor de isAscending. Por padrão é ASC (Ascendente), se falso será DESC (Descendente).
      isAscending: query.isAscending === 'false' ? '-1' : '1',
      field: ''
    }

    switch (query.sort) {
      case '_id':
        orderQuery.field = '_id'
        break

      case 'id':
        orderQuery.field = '_id'
        break

      case 'name':
        orderQuery.field = 'name'
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

  constructWhereQuery(query: Query): any {
    /** 
     * Construição do WHERE:
     * 
     * Possíveis parâmentros:
     * contains: procura pela string informada em todos os campos especificados na função constructWhereClause(), no arquivo UsersDAO.js
     * 
     * Verifique a coleção do postman para um exemplo de uso desse campo.
     */
    if (query.contains !== undefined) {
      return { contains: query.contains }
    } else {
      return {}
    }
  }

  randomSHA256(low: number, high: number): string {
    return sha256(this.randomInt(low, high))
  }

  randomInt(low: number, high: number): string {
    return Math.floor(Math.random() * (high - low) + low).toString()
  }
}
