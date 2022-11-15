import $api from '../http';
import { ClientType } from '../redux/types';

const path = 'clients';

export default class ClientsService {
  static async getClients(): Promise<ClientType[]> {
    return $api.get(`${path}`);
  }

  static async getClient(id: string): Promise<ClientType> {
    return $api.get(`${path}/${id}`);
  }

  static async editClient(newClient: ClientType): Promise<ClientType> {
    return $api.put(`${path}/${newClient.id}`, { ...newClient });
  }
}
