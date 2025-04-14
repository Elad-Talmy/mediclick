import { showToast } from '../store';
import { useAppDispatch } from './useAppDispatch';

type ToastType = 'success' | 'error';

export const useToast = () => {
   const dispatch = useAppDispatch();

   const trigger = (message: string, type: ToastType) => {
      dispatch(showToast({ message, type }));
   };

   return {
      success: (msg: string) => trigger(msg, 'success'),
      error: (msg: string) => trigger(msg, 'error'),
   };
};
