import $api from '../http';
import { UserType } from '../types';

const path = 'auth';

export default class AuthService {
  static async login(username: string, password: string) {
    return $api.post(`${path}/login`, { username, password });
  }

  static async checkAuth(refreshToken: string) {
    return $api.post(`${path}/refresh`, { refreshToken });
  }

  // static async registration(email, password, name) {
  //     return $api.post('/api/registration', {email, password, name})
  // }

  static async logout(refreshToken: string) {
    return $api.post(`${path}/logout`, { refreshToken });
  }
}
