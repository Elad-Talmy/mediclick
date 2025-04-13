import { createContext, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_PAGE, LOGIN_PAGE } from '../utils';
import { useLocalStorage } from '../hooks';

type AuthContextType = {
   token: string | null;
   isAuthenticated: boolean;
   login: (token: string) => void;
   logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [token, setToken, removeToken] = useLocalStorage<string | null>(
      'token',
      null
   );

   const navigate = useNavigate();

   const login = (newToken: string) => {
      setToken(newToken);
      navigate(DASHBOARD_PAGE);
   };

   const logout = () => {
      removeToken();
      navigate(LOGIN_PAGE);
   };

   return (
      <AuthContext.Provider
         value={{ token, isAuthenticated: !!token, login, logout }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) throw new Error('useAuth must be used within AuthProvider');
   return context;
};
