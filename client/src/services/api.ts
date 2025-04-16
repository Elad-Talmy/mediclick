const API_BASE = import.meta.env.VITE_API_URL;

export const api = {
   get: async (endpoint: string, token?: string) => {
      const res = await fetch(`${API_BASE}${endpoint}`, {
         headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.json();
   },

   post: async (endpoint: string, body: any, token?: string) => {
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

   delete: async (endpoint: string, token?: string) => {
      const res = await fetch(`${API_BASE}${endpoint}`, {
         method: 'DELETE',
         headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.json();
   },
};
