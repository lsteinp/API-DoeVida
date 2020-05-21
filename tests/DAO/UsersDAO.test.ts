import sinon from 'sinon'
import UsersDAO from '../../DAO/UsersDAO'
import Constants from '../../config/constants'

describe('UsersDAO', () => {
  let usersDAO: UsersDAO
  const user1 = {
    id: '1',
    name: 'jack',
    email: 'jack@deck.com',
    token: 'thistoken',
  }
  const user2 = {
    id: '2',
    name: 'queen',
    email: 'queen@deck.com',
    token: 'thisothertoken',
  }
  const user2Updated = {
    id: '2',
    name: 'TheQueen',
    email: 'queen@deck.com',
    token: 'thisothertoken',
  }

  describe('sucess', () => {
    beforeEach(() => {
      const userModel = {
        find: sinon.fake.returns({
          sort: sinon.fake.returns({
            exec: sinon.fake.resolves([user1, user2]),
          }),
        }),
        findById: sinon.fake.returns({
          exec: sinon.fake.resolves(user1),
        }),
        findOne: sinon.fake.returns({
          exec: sinon.fake.returns(user2),
        }),
        findByIdAndUpdate: sinon.fake.returns({
          exec: sinon.fake.resolves(user2Updated),
        }),
        findByIdAndRemove: sinon.fake.returns({
          exec: sinon.fake.resolves(user1),
        }),
        save: sinon.fake.resolves(user2),
      }
      //@ts-ignore
      usersDAO = new UsersDAO(userModel)
    })

    it('Should fetch users', async () => {
      // @ts-ignore
      const result = await usersDAO.fetchUsers({}, {})
      expect(result.data.length).toEqual(2)
      expect(result.errorObj).toBeFalsy()
    })

    it('Should find user', async () => {
      const result = (await usersDAO.findUser('id')).data

      expect(result.id).toBe('1')
      expect(result.name).toBe('jack')
      expect(result.email).toBe('jack@deck.com')
      expect(result.token).toBe('thistoken')
    })

    it('Should find user by email', async () => {
      const { data } = await usersDAO.findUserByEmail('queen@deck.com')

      expect(data.id).toBe('2')
      expect(data.name).toBe('queen')
      expect(data.email).toBe('queen@deck.com')
      expect(data.token).toBe('thisothertoken')
    })

    it('Should update user', async () => {
      const result = (await usersDAO.updateUser(user2Updated)).data

      expect(result).toBe(user2Updated)
    })

    it('Should delete user', async () => {
      const result = (await usersDAO.deleteUser('1')).data

      expect(result).toBe(user1)
    })
  })

  describe('error', () => {
    beforeEach(() => {
      const userModel = {
        find: sinon.fake.returns({
          sort: sinon.fake.returns({
            exec: sinon.fake.throws(new Error('not apple pie')),
          }),
        }),
        findById: sinon.fake.returns({
          exec: sinon.fake.throws(new Error('not apple pie')),
        }),
        findOne: sinon.fake.returns({
          exec: sinon.fake.throws(new Error('not apple pie')),
        }),
        findByIdAndUpdate: sinon.fake.returns({
          exec: sinon.fake.throws(new Error('not apple pie')),
        }),
        findByIdAndRemove: sinon.fake.returns({
          exec: sinon.fake.throws(new Error('not apple pie')),
        }),
        save: sinon.fake.throws(new Error('not apple pie')),
      }
      //@ts-ignore
      usersDAO = new UsersDAO(userModel)
    })

    it('Should not fetch users', async () => {
      // @ts-ignore
      const result = await usersDAO.fetchUsers({}, {})
      expect(result.errorObj.statusCode).toBe(Constants.notFound)
      expect(result.data).toBeFalsy()
    })

    it('Should not find user', async () => {
      const result = await usersDAO.findUser('id')

      expect(result.errorObj.statusCode).toBe(Constants.notFound)
      expect(result.data).toBeFalsy()
    })

    it('Should not update user', async () => {
      const result = await usersDAO.updateUser(user2Updated)

      expect(result.errorObj.statusCode).toBe(Constants.notFound)
      expect(result.data).toBeFalsy()
    })

    it('Should not delete user', async () => {
      const result = await usersDAO.deleteUser('1')

      expect(result.errorObj.statusCode).toBe(Constants.notFound)
      expect(result.data).toBeFalsy()
    })
  })
})
