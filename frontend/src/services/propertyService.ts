import api from './api';
import type { ApiResponse, Property, PaginatedResponse } from '../types';

export const propertyService = {
  async getAll(page: number = 1, limit: number = 8): Promise<ApiResponse<PaginatedResponse<Property>>> {
    const { data } = await api.get<ApiResponse<PaginatedResponse<Property>>>(`/properties?page=${page}&limit=${limit}`);
    return data;
  },
  async getById(id: string): Promise<ApiResponse<Property>> {
    const { data } = await api.get<ApiResponse<Property>>(`/properties/${id}`);
    return data;
  },
};
