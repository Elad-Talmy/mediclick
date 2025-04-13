import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages';
import { LOGIN_PAGE } from './utils';
import { AuthProvider } from './context';
import './App.css';

function App() {
   return (
      <AuthProvider>
         <Routes>
            <Route path={LOGIN_PAGE} element={<LoginPage />} />
            <Route path="*" element={<Navigate to={LOGIN_PAGE} />} />
         </Routes>
      </AuthProvider>
   );
}

export default App;
