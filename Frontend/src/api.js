const BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data?.error?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.code = data?.error?.code;
    err.status = res.status;
    throw err;
  }

  return data;
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  listProducts: (token) => request('/products', { token }),
  createProduct: (token, payload) => request('/products', { method: 'POST', body: payload, token }),
  listStores: (token) => request('/stores', { token }),
  createStore: (token, payload) => request('/stores', { method: 'POST', body: payload, token }),
  listStock: (token, query = '') => request(`/stock${query}`, { token }),
  adjustStock: (token, payload) => request('/stock/adjust', { method: 'POST', body: payload, token }),
  transferStock: (token, payload) => request('/stock/transfer', { method: 'POST', body: payload, token }),
};
