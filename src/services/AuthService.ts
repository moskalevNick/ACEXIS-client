import $api from '../http';

const path = 'auth';

export default class AuthService {
  static async login(username: string, password: string) {
    return $api.post(`${path}/login`, { username, password });
  }

  static async registration(username: string, password: string, cameraToken: string) {
    return $api.post(`${path}/registration`, { username, password, cameraToken });
  }

  static async checkAuth(refreshToken: string) {
    return $api.post(`${path}/refresh`, { refreshToken });
  }

  static async logout(refreshToken: string) {
    return $api.post(`${path}/logout`, { refreshToken });
  }
}
