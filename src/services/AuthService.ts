import $api from '../http';
import { ClientType } from '../redux/types';

const path = 'auth';

export default class AuthService {
  static async login(username: string, password: string) {
    return $api.post(`${path}/signin`, { username, password });
  }

  // static async checkAuth(refreshToken: string) {
  //   return $api.post(`${path}/refresh`, { refreshToken });
  // }

  // static async registration(email, password, name) {
  //     return $api.post('/api/registration', {email, password, name})
  // }
  // static async logout() {
  //     return $api.post('/api/logout')
  // }
  // static async getClients(): Promise<ClientType[]> {
  //   return $api.get(`client`);
  // }
  // static async setCity(city, name) {
  //     return $api.post(`/api/city/${city}`, {name})
  // }
  // static async refresh() {
  //     return $api.get('/api/refresh', {withCredentials: true})
  // }
}
