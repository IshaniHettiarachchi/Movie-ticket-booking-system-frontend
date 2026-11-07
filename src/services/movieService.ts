import api from './api';

export interface Movie {
  id: number;
  title: string;
  description: string | null;
  duration: number;
  language: string;
  genre: string;
  releaseDate: string;
  status: string;
}

export const getAllMovies = async (): Promise<Movie[]> => {
  const response = await api.get<Movie[]>('/movies');
  return response.data;
};
