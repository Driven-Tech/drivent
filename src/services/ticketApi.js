import api from './api';

export async function getTicketType(token) {
  try {
    const response = await api.get('http://localhost:4000/tickets/types', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.data);
  }
}
