import { useAppSelector } from '../../hooks';
import { useWaitingList } from '../../hooks/useWaitingList';
import { useQuery } from '@tanstack/react-query';
import { getDoctorsById } from '../../services/doctors';

export const Waitlist = () => {
   const subscribedDoctorIds = useAppSelector(
      (state) => state.waitlist.subscribedDoctorIds
   );
   const { unsubscribe } = useWaitingList();

   const {
      data: doctors,
      isLoading,
      isError,
   } = useQuery({
      queryKey: ['waitlist-doctors', subscribedDoctorIds],
      queryFn: () => getDoctorsById(subscribedDoctorIds),
      enabled: subscribedDoctorIds.length > 0,
   });

   if (!subscribedDoctorIds.length || isLoading) return null;
   if (isError)
      return <div className="dashboard-waitlist">Failed to load waitlist</div>;

   return (
      <div className="dashboard-waitlist">
         <h3>On Your Waitlist</h3>
         <ul>
            {doctors?.map((doc: any) => (
               <li key={doc._id} className="waitlist-item">
                  <span>{doc.name}</span>
                  <button onClick={() => unsubscribe(doc._id)}>Cancel</button>
               </li>
            ))}
         </ul>
      </div>
   );
};
