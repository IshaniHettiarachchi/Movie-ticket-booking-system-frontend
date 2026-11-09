import api from './api';

export interface Theatre {
  id: number;
  name: string;
  location: string;
  capacity: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export const getAllTheatres = async (): Promise<Theatre[]> => {
  const response = await api.get<Theatre[]>('/theatres');
  return response.data;
};

export const getTheatresByStatus = async (
  status: 'ACTIVE' | 'INACTIVE'
): Promise<Theatre[]> => {
  const response = await api.get<Theatre[]>(`/theatres/status/${status}`);
  return response.data;
};
