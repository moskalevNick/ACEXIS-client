import $api from '../http';
import { ImageType, UserType } from '../types';

const path = 'users';

export default class UserService {
  static async editUser(newUser: UserType) {
    const response = await $api.put(`${path}`, { ...newUser });
    return response.data;
  }

  static async uploadAvatar(image: File): Promise<ImageType> {
    const formData = new FormData();
    formData.append('file', image);
    const response = await $api.post(`${path}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}
