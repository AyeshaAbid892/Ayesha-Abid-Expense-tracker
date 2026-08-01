import { API_BASE_URL } from './config';

const BASE_URL = `${API_BASE_URL}/expenses`;

function buildQueryString(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      params.append(key, value);
    }
  });
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

export async function getAllExpenses(filters = {}) {
  const response = await fetch(`${BASE_URL}${buildQueryString(filters)}`);
  return response.json();
}

export async function getStats(userId) {
  const response = await fetch(`${BASE_URL}/stats${buildQueryString({ userId })}`);
  return response.json();
}

export async function createExpense(data) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateExpense(id, data) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteExpense(id) {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return response.json();
}

export function getExportCsvUrl(userId) {
  return `${BASE_URL}/export${buildQueryString({ userId })}`;
}
