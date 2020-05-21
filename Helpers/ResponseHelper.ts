import constants from '../config/constants'

export interface Response {
  statusCode: number;
  statusDesc: string;
  data: any;
}

export default class ResponseHelper {
  static createResponse(error: any, data: any): Response {
    if (!error) {
      return {
        statusCode: constants.successCode,
        statusDesc: constants.successDesc,
        data: data
      }
    } else {
      return {
        statusCode: error.statusCode,
        statusDesc: error.statusDesc,
        data: data
      }
    }
  }
}
