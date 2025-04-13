import { MedicalField } from '../types';

type Props = {
   fields: MedicalField[];
};

export const MedicalFieldList = ({ fields }: Props) => {
   return (
      <>
         <h3 className="section-title">Available Medical Services</h3>
         <ul className="field-list">
            {fields.map((f) => (
               <li key={f.id} className="field-item">
                  <strong>{f.name}</strong> — {f.description}
               </li>
            ))}
         </ul>
      </>
   );
};
