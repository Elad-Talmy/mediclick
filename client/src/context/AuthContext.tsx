import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { AppView, goToView } from '../store/slices/viewSlice';
import { fetchUser } from '../store/slices/userSlice';

type AuthContextType = {
   token: string | null;
   login: (token: string) => void;
   logout: () => void;
   isAuthenticated: boolean;
   isInitializing: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [token, setToken] = useState<string | null>(null);
   const [isInitializing, setIsInitializing] = useState(true);

   const dispatch = useAppDispatch();

   useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
         setToken(storedToken);
         dispatch(goToView(AppView.Dashboard));
      }
      setIsInitializing(false);
   }, []);

   const login = useCallback(
      (newToken: string) => {
         localStorage.setItem('token', newToken);
         setToken(newToken);
         dispatch(goToView(AppView.Dashboard));
      },
      [localStorage]
   );

   const logout = useCallback(() => {
      localStorage.removeItem('token');
      setToken(null);
      dispatch(goToView(AppView.Login));
   }, [localStorage]);

   return (
      <AuthContext.Provider
         value={{
            token,
            login,
            logout,
            isAuthenticated: !!token,
            isInitializing,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const ctx = useContext(AuthContext);
   if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
   return ctx;
};
