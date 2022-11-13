import $api from '../http';
import { ClientType } from '../redux/types';

export default class ClientsService {
  static async getClients(): Promise<ClientType[]> {
    return $api.get(`client`);
  }

  static async getClient(id: string): Promise<ClientType> {
    return $api.get(`client/${id}`);
  }

  static async editClient(newClient: ClientType): Promise<ClientType> {
    return $api.put(`client/${newClient.id}`, { ...newClient });
  }
}
