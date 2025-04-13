import { ButtonHTMLAttributes } from 'react';
import './Button.less';

type ButtonProps = {
   label: string;
   isFullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
   label,
   isFullWidth = true,
   ...props
}: ButtonProps) {
   return (
      <button
         className={`mediclick-btn ${isFullWidth ? 'full-width' : ''}`}
         {...props}
      >
         {label}
      </button>
   );
}
