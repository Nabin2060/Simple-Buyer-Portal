import api from './api';
import type { ApiResponse, Property } from '../types';

export const favouriteService = {
  async getFavourites(): Promise<ApiResponse<Property[]>> {
    const { data } = await api.get<ApiResponse<Property[]>>('/favourites');
    return data;
  },

  async addFavourite(propertyId: string): Promise<ApiResponse<null>> {
    const { data } = await api.post<ApiResponse<null>>(`/favourites/${propertyId}`);
    return data;
  },

  async removeFavourite(propertyId: string): Promise<ApiResponse<null>> {
    const { data } = await api.delete<ApiResponse<null>>(`/favourites/${propertyId}`);
    return data;
  },
};
