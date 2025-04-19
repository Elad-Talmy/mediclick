import { useAppSelector } from '../../hooks';
import { useWaitingList } from '../../hooks/useWaitingList';
import { useQuery } from '@tanstack/react-query';
import { getDoctorsById } from '../../services/doctors';
import { Trash2 } from 'lucide-react';
import './WaitList.less';

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
      return (
         <div className="dashboard-waitlist">❌ Failed to load waitlist</div>
      );

   return (
      <div className="dashboard-waitlist">
         <h3 className="waitlist-title">🔔 On Your Waitlist</h3>
         <ul className="waitlist-list">
            {doctors?.map((doc: any) => (
               <li key={doc._id} className="waitlist-card">
                  <div className="waitlist-card-left">
                     {doc.pfp && (
                        <img
                           src={doc.pfp}
                           alt={doc.name}
                           className="waitlist-img"
                        />
                     )}
                     <div>
                        <div className="waitlist-docname">{doc.name}</div>
                        <div className="waitlist-specialty">
                           {doc.specialty}
                        </div>
                     </div>
                  </div>
                  <button
                     onClick={() => unsubscribe(doc._id)}
                     className="waitlist-remove-btn"
                     title="Remove from waitlist"
                  >
                     <Trash2 size={16} />
                  </button>
               </li>
            ))}
         </ul>
      </div>
   );
};
