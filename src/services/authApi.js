import api from './api';

export async function signIn(email, password) {
  const response = await api.post('http://localhost:4000/auth/sign-in', { email, password });
  return response.data;
}
//
