import $api from '../http';
import { ClientType, CreateClientType, ImageType } from '../types';

const path = 'clients';

export default class ClientsService {
  static async getClients(): Promise<ClientType[]> {
    const response = await $api.get(`${path}`);
    return response.data;
  }

  static async getClient(id: string): Promise<ClientType> {
    const response = await $api.get(`${path}/id/${id}`);
    return response.data;
  }

  static async editClient(newClient: CreateClientType, id: string): Promise<ClientType> {
    const response = await $api.put(`${path}/${id}`, newClient);
    return response.data;
  }

  static async addClient(newClient: Omit<ClientType, 'id' | 'images'>): Promise<ClientType> {
    const response = await $api.post(`${path}`, { ...newClient });
    return response.data;
  }

  static async deleteClient(id: string): Promise<ClientType> {
    const response = await $api.delete(`${path}/${id}`);
    return response.data;
  }
}
