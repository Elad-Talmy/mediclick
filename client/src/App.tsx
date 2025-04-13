import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage, LoginPage } from './pages';
import { DASHBOARD_PAGE, LOGIN_PAGE } from './utils';
import { AuthProvider } from './context';
import './App.css';

function App() {
   return (
      <AuthProvider>
         <Routes>
            <Route path={LOGIN_PAGE} element={<LoginPage />} />
            <Route path={DASHBOARD_PAGE} element={<DashboardPage />} />
            <Route path="*" element={<Navigate to={LOGIN_PAGE} />} />
         </Routes>
      </AuthProvider>
   );
}

export default App;
