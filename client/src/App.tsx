import { DashboardPage, LoginPage } from './pages';
import { useAppSelector } from './hooks/useAppSelector';
import { AppView } from './store/slices/viewSlice';
import './App.css';

const App = () => {
   const currentView = useAppSelector((state) => state.view.current);

   return (
      <>
         {currentView === AppView.Login && <LoginPage />}
         {currentView === AppView.Dashboard && <DashboardPage />}
      </>
   );
};

export default App;
