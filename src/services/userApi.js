import api from './api';

export async function signUp(email, password) {
  const response = await api.post('http://localhost:4000/users', { email, password });
  return response.data;
}
//
