export default class Constants {
  // API KEY
  static get APISecretKey(): string {
    return 'Esta é uma chave secreta para a autenticação de tokens. Use uma string aleatória.'
  }

  // API CODES
  static get successCode(): number { return 0 }
  static get errorCodeMongoose(): number { return 1 }
  static get errorCodeAuth(): number { return 2 }
  static get notFound(): number { return 3 }

  // API DESCRIPTION CODES
  static get successDesc(): string { return 'Sucesso' }
  static get notFoundDesc(): string { return 'Registro não encontrado' }
  static get authenticationFailed(): string { return 'Usuário ou senha inválidos' }
  static get invalidToken(): string { return 'Token inválido' }
  static get tokenNotFound(): string { return 'Token não encontrado' }

  // GENERAL CONSTANTS
  static get minRandomNumber(): number { return 100000000000 }
  static get maxRandomNumber(): number { return 999999999999 }
  static get sessionTime(): string { return '1h' }
}
