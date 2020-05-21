
import { container } from '../container'
import { ControllerResponse } from '.'
import Container from '../container'

export default class LoginController {
  protected container: Container

  constructor() {
    this.container = container
  }

  login(token: string, email: string, name: string): Promise<ControllerResponse> {
    return this.container.usersDAO.login(token, email, name)
  }
}
