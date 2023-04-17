
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';
import $API from '../http';

export default class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $API.get<IUser[]>('/users')
    }
}