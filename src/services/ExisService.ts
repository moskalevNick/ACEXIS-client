import $api from '../http';
import { ExisType } from '../redux/types';

export default class ExisService {
  static async getExis(id: string): Promise<ExisType> {
    return $api.get(`exis/${id}`);
  }

  static async editExis(newExis: ExisType): Promise<ExisType> {
    return $api.put(`exis/${newExis.id}`, { ...newExis });
  }

  static async createExis(newExis: ExisType): Promise<ExisType> {
    return $api.post(`exis`, { ...newExis });
  }

  static async deleteExis(id: string): Promise<ExisType> {
    return $api.delete(`exis/${id}`);
  }
}
