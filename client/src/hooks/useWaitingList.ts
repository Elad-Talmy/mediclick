import { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector, useToast } from '../hooks';
import {
   subscribeDoctor,
   unsubscribeDoctor,
} from '../store/slices/waitListSlice';
import { Doctor } from '../types';

export const useWaitingList = () => {
   const workerRef = useRef<Worker | null>(null);
   const toast = useToast();
   const dispatch = useAppDispatch();
   const subscribedDoctors = useAppSelector(
      (state) => state.waitlist.subscribedDoctorIds
   );

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) return;

      workerRef.current = new Worker(
         new URL('../worker/waitingWorker.ts', import.meta.url),
         { type: 'module' }
      );

      workerRef.current.postMessage({ type: 'init', token });

      workerRef.current.onmessage = (e) => {
         const { type, payload } = e.data;
         if (type === 'SLOT_UPDATE') {
            toast.success(
               `🎉 Slot for ${payload} at ${new Date(payload.slot).toLocaleTimeString()}`
            );
         }
      };

      return () => {
         workerRef.current?.terminate();
         workerRef.current = null;
      };
   }, []);

   useEffect(() => {
      Object.keys(subscribedDoctors).forEach((id) =>
         workerRef.current?.postMessage({ type: 'subscribe', doctorId: id })
      );
   }, [subscribedDoctors]);

   const subscribe = (doctorId: string) => {
      dispatch(subscribeDoctor(doctorId));
   };

   const unsubscribe = (doctorId: string) => {
      dispatch(unsubscribeDoctor(doctorId));
      workerRef.current?.postMessage({ type: 'unsubscribe', doctorId });
   };

   const isSubscribed = (doctorId: string) =>
      Object.keys(subscribedDoctors).includes(doctorId);

   return { subscribe, unsubscribe, isSubscribed };
};
