import $api from '../http';
import { CreateExisType, EditExisType, ExisType } from '../types';

const path = 'exises';

export default class ExisService {
  static async getExises(clientId: string): Promise<ExisType[]> {
    const response = await $api.get(`${path}/${clientId}`);
    return response.data;
  }

  static async editExis(newExis: EditExisType): Promise<ExisType> {
    const response = await $api.put(`${path}/${newExis.id}`, {
      text: newExis.text,
      isPinned: newExis.isPinned,
    });
    return response.data;
  }

  static async createExis(newExis: CreateExisType): Promise<ExisType> {
    const response = await $api.post(`${path}/${newExis.clientId}`, { ...newExis });
    return response.data;
  }

  static async deleteExis(id: string): Promise<ExisType> {
    const response = await $api.delete(`${path}/${id}`);
    return response.data;
  }
}
