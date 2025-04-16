type Props = {
   fields: string[];
};

export const MedicalFieldList = ({ fields }: Props) => {
   return (
      <>
         <h3 className="section-title">Available Medical Services</h3>
         <ul className="field-list">
            {fields.map((f) => (
               <li key={f} className="field-item">
                  <strong>{f}</strong>
               </li>
            ))}
         </ul>
      </>
   );
};
