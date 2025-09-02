import axios from 'axios';
const base = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const api = axios.create({ baseURL: base });

export async function analyzeText(text){
  const { data } = await api.post('/api/analyze', { text });
  return data.result;
}
export async function fetchSentences(){ const { data } = await api.get('/api/sentences'); return data; }
export async function getLeaderboard(){ const { data } = await api.get('/api/leaderboard'); return data; }
export async function postScore(payload){ const { data } = await api.post('/api/leaderboard', payload); return data; }
export async function askAI(q){ const { data } = await api.post('/api/chat', { question: q }); return data; }
