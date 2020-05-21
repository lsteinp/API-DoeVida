import { Request } from 'express'

export interface APIRequest extends Request {
    token?: string;
    User?: any;
}

export interface Query {
    isAscending: string;
    sort: string;
    contains: string;
    field: string;
}

export interface ControllerResponse {
    data: any;
    errorObj: any;
}