import { memo, useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { STEP_ORDER } from '../../store';
import { BookingStep } from '../../types';
import './BookingProgressBar.less';

export const STEP_LABELS: Record<BookingStep, string> = {
   specialty: 'Choose Specialty',
   doctor: 'Choose Doctor',
   time: 'Pick Time',
   confirm: 'Confirm Booking',
};

export const BookingProgressBar = memo(() => {
   const currentStep = useAppSelector((state) => state.booking.step);
   const currentIndex = useMemo(
      () => STEP_ORDER.indexOf(currentStep),
      [currentStep]
   );
   const progress = useMemo(
      () => ((currentIndex + 1) / STEP_ORDER.length) * 100,
      [currentIndex]
   );

   return (
      <div className="progress-wrapper">
         <div className="progress-text">
            Step {currentIndex + 1} of {STEP_ORDER.length} —{' '}
            {STEP_LABELS[currentStep]}
         </div>

         <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
         </div>

         <div className="progress-steps">
            {STEP_ORDER.map((step, index) => (
               <div
                  key={step}
                  className={`progress-step ${index <= currentIndex ? 'active' : ''}`}
               >
                  {index + 1}
               </div>
            ))}
         </div>
      </div>
   );
});
