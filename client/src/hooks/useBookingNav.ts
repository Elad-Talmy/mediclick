import { goToPreviousStep } from '../store';
import { AppView, goToView } from '../store/slices/viewSlice';
import { isFirstBookingStep } from '../utils';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useBookingNav = () => {
   const step = useAppSelector((state) => state.booking.step);
   const dispatch = useAppDispatch();

   return () => {
      if (isFirstBookingStep(step)) {
         dispatch(goToView(AppView.Dashboard));
      } else {
         dispatch(goToPreviousStep());
      }
   };
};
