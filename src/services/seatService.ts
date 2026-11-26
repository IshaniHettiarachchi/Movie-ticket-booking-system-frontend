import api from './api';

export const getUnavailableSeats = async (
  showId: number
): Promise<string[]> => {
  const response = await api.get<string[]>(
    `/bookings/show/${showId}/unavailable-seats`
  );

  return response.data;
};
