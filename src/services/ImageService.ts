import $api from '../http';
import { ImageType } from '../redux/types';

export default class ImageService {
  static async getImages(clientId: string): Promise<ImageType[]> {
    const response = await $api.get(`images/${clientId}`);
    return response.data;
  }
  static async uploadImage(clientId: string, image: File): Promise<ImageType> {
    const formData = new FormData();
    formData.append('file', image);
    const response = await $api.post(`clients/image/${clientId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
  static async deleteImage(imageId: string): Promise<ImageType> {
    const response = await $api.delete(`clients/image/${imageId}`);
    return response.data;
  }
}
