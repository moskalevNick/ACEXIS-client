import $api from '../http';
import { ImageType } from '../redux/types';

export default class AvatarService {
  static async getAvatar(id: string): Promise<ImageType> {
    return $api.get(`image/${id}`);
  }
}
