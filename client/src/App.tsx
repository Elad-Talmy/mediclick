import { BookingPage, DashboardPage, LoginPage, SuccessPage } from './pages';
import { useAppSelector } from './hooks/useAppSelector';
import { AppView } from './store/slices/viewSlice';
import { useAuth } from './context/AuthContext';
import { FullScreenLoader } from './components';
import './App.css';

const App = () => {
   const currentView = useAppSelector((state) => state.view.current);
   const { isInitializing } = useAuth();

   if (isInitializing) return <FullScreenLoader />;

   return (
      <>
         {currentView === AppView.Login && <LoginPage />}
         {currentView === AppView.Dashboard && <DashboardPage />}
         {currentView === AppView.Booking && <BookingPage />}
         {currentView === AppView.Success && <SuccessPage />}
      </>
   );
};

export default App;
