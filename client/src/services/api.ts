export const API_BASE = import.meta.env.VITE_API_URL;

export const api = {
   getToken: () => localStorage.getItem('token'),
   get: async (endpoint: string, params?: Record<string, any>) => {
      const token = api.getToken();
      const url = new URL(`${API_BASE}${endpoint}`);
      if (params) {
         Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null)
               url.searchParams.append(key, value.toString());
         });
      }

      const res = await fetch(url.toString(), {
         headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return res.json();
   },
   post: async (endpoint: string, body: any) => {
      const token = api.getToken();
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
      const token = api.getToken();
      const res = await fetch(`${API_BASE}${endpoint}`, {
         method: 'DELETE',
         headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.json();
   },
};
