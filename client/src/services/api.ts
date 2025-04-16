export const API_BASE = import.meta.env.VITE_API_URL;

const token = localStorage.getItem('token');
export const api = {
   get: async (endpoint: string) => {
      const res = await fetch(`${API_BASE}${endpoint}`, {
         headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.json();
   },

   post: async (endpoint: string, body: any) => {
      const res = await fetch(`${API_BASE}${endpoint}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
         },
         body: JSON.stringify(body),
      });
      return res.json();
   },

   delete: async (endpoint: string) => {
      const res = await fetch(`${API_BASE}${endpoint}`, {
         method: 'DELETE',
         headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.json();
   },
};
