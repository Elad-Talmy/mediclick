import { InputHTMLAttributes } from "react";
import "./Input.less"; 

type InputProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input
        className={`input${error ? " error" : ""}`}
        {...props}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
