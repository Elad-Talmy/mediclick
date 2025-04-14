import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { clearToast } from '../../store';
import './Toast.less';

export const Toast = () => {
   const toast = useAppSelector((state) => state.ui.toast);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (toast) {
         const timer = setTimeout(() => {
            dispatch(clearToast());
         }, 3000);
         return () => clearTimeout(timer);
      }
   }, [toast]);

   if (!toast) return null;

   return (
      <div className={`toast-container ${toast.type}`}>
         <span>{toast.message}</span>
      </div>
   );
};
