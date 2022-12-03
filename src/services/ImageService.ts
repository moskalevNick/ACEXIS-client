import axios from 'axios';
import $api from '../http';
import { CameraFrameType, ImageType } from '../types';

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

  static async getCameraFrame(): Promise<CameraFrameType[]> {
    const response = await axios.request({
      url: 'http://10.8.0.142/get_stream.php?token=2d94cf33650cb88fa4bb41287e668124',
      method: 'get',
      // headers: {
      //   cookies: 'SameSite=None; Secure',
      // },
    });
    return response.data;
  }
}
