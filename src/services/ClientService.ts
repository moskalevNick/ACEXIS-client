import $api from '../http';
import { ClientType, ImageType } from '../redux/types';

const path = 'clients';

export default class ClientsService {
  static async getClients(): Promise<ClientType[]> {
    const response = await $api.get(`${path}`);
    return response.data;
  }

  static async getClient(id: string): Promise<ClientType> {
    const response = await $api.get(`${path}/${id}`);
    return response.data;
  }

  static async editClient(newClient: ClientType): Promise<ClientType> {
    return $api.put(`${path}/${newClient.id}`, { ...newClient });
  }
}
