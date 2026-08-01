import { API_BASE_URL } from './config';

const BASE_URL = `${API_BASE_URL}/notifications`;

export async function getUserNotifications(userId) {
  const response = await fetch(`${BASE_URL}/${userId}`);
  return response.json();
}
