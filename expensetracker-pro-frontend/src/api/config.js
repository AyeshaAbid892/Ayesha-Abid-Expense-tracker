// In production (Vercel), set VITE_API_BASE_URL in the project's Environment
// Variables to your deployed Render backend, e.g. https://ledgerly-api.onrender.com/api
// Locally, it falls back to the backend running on localhost.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
