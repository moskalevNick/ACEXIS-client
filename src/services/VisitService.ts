import { VisitsType, UpdateVisitType } from './../types';
import $api from '../http';

const path = 'visit';

export default class VisitService {
  static async getVisits(clientId: string): Promise<VisitsType[]> {
    const response = await $api.get(`${path}/${clientId}`);
    return response.data;
  }

  static async updateVisit(id: string, newVisit: UpdateVisitType): Promise<VisitsType> {
    const response = await $api.put(`${path}/${id}`, newVisit);
    return response.data;
  }
}
