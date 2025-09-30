const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function api(path, opts = {}) {
  const token = localStorage.getItem('token');
  const headers = opts.headers || {};
  headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(API_URL + path, { ...opts, headers });
  const data = await res.json().catch(()=>({}));
  if (!res.ok) throw data;
  return data;
}
