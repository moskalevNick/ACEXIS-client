import $api from '../http';
import { AvatarType } from '../redux/types';

export default class AvatarService {
  static async getAvatar(id: string): Promise<AvatarType> {
    return $api.get(`avatar/${id}`);
  }
}
