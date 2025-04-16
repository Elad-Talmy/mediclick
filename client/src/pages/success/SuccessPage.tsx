import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchUser } from '../../store/slices/userSlice';
import { AppView, goToView } from '../../store/slices/viewSlice';
import './SuccessPage.less';

export const SuccessPage = () => {
   const dispatch = useAppDispatch();

   return (
      <div className="dashboard-container">
         <h2 className="dashboard-header">🎉 Appointment Confirmed!</h2>
         <p className="success-message">
            You're all set. We'll see you soon 😄
         </p>
         <button
            className="action-btn"
            onClick={() => {
               dispatch(goToView(AppView.Dashboard));
               dispatch(fetchUser()); //think of a smarter way
            }}
         >
            Back to Dashboard
         </button>
      </div>
   );
};
