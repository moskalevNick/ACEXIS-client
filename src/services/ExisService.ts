import $api from '../http';
import { ExisType } from '../redux/types';

const path = 'exises';

export default class ExisService {
  static async getExis(id: string): Promise<ExisType> {
    return $api.get(`${path}/${id}`);
  }

  static async editExis(newExis: ExisType): Promise<ExisType> {
    return $api.put(`${path}/${newExis.id}`, { ...newExis });
  }

  static async createExis(newExis: ExisType): Promise<ExisType> {
    return $api.post(`${path}`, { ...newExis });
  }

  static async deleteExis(id: string): Promise<ExisType> {
    return $api.delete(`${path}/${id}`);
  }
}
