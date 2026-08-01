import { API_BASE_URL } from './config';

const BASE_URL = `${API_BASE_URL}/users`;

export async function getAllUsers() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function getUserSummary(userId) {
  const response = await fetch(`${BASE_URL}/${userId}/summary`);
  return response.json();
}
