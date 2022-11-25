import { useAppSelector } from './../hooks/redux';
import $api from '../http';
import { clientFilterType, ClientType, CreateClientType, FiltersType, ImageType } from '../types';

const path = 'clients';

export default class ClientsService {
  static async getClients(filterParams: FiltersType): Promise<any> {
    const filtersForServer: clientFilterType = {};

    let filteredPath = '';
    if (filterParams) {
      filteredPath = '?';

      for (const param in filterParams) {
        switch (param) {
          case 'date':
            filtersForServer.dateFrom = filterParams[param].startDate.toString();
            filtersForServer.dateTo = filterParams[param].endDate.toString();
            break;
          case 'range':
            filtersForServer.billFrom = filterParams[param].min;
            filtersForServer.billTo = filterParams[param].max;
            break;
          case 'searchString':
            filtersForServer.searchString = filterParams[param];

            break;

          case 'status':
            if (filterParams[param].length) {
              let queryString = '';

              filterParams[param].forEach((status, i, arr) => {
                queryString = queryString.concat(`status[]=${status}&`);
              });
              filtersForServer.status = queryString;
            }

            break;
        }
      }

      for (const param in filtersForServer) {
        if (param === 'status') {
          filteredPath = filteredPath.concat(
            `${filtersForServer[param as keyof clientFilterType]}`,
          );
        } else {
          filteredPath = filteredPath.concat(
            `${param}=${filtersForServer[param as keyof clientFilterType]}&`,
          );
        }
      }
    }

    if (filteredPath[filteredPath.length - 1] === '&') {
      filteredPath = filteredPath.slice(0, -1);
    }

    const response = await $api.get(`${path}${filteredPath}`);
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
