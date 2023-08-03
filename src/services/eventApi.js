import api from './api';

export async function getEventInfo() {
  const response = await api.get('http://localhost:4000/event');
  return response.data;
}
//
