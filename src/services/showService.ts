import api from './api';

export interface Show {
  id: number;

  movie: {
    id: number;
    title: string;
    genre: string;
    language: string;
    duration: number;
  };

  theatre: {
    id: number;
    name: string;
    location: string;
    capacity: number;
  };

  showDate: string;
  showTime: string;
  ticketPrice: number;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

export const getAllShows = async (): Promise<Show[]> => {
  const response = await api.get<Show[]>('/shows');
  return response.data;
};
