import { useState } from 'react';
import { getOtp, verifyOtp } from '../../services';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_PAGE, ISRAELI_PHONE_REGEX } from '../../utils';
import { Input } from '../../components';
import { useAuth } from '../../context';
import Button from '../../components/button/Button';
import './LoginPage.less';

export const LoginPage = () => {
   const [phone, setPhone] = useState('');
   const [otpSent, setOtpSent] = useState(false);
   const [otpInput, setOtpInput] = useState('');
   const { login } = useAuth();
   const navigate = useNavigate();

   const handleSendOtp = async () => {
      if (!phone.match(ISRAELI_PHONE_REGEX)) {
         alert('Please enter a valid Israeli phone number.'); //Log to file
         return;
      }

      try {
         const otp = await getOtp(phone);
         alert(`Mock OTP: ${otp}`);
         setOtpSent(true);
      } catch (err) {
         alert('Failed to send OTP');
      }
   };

   const handleVerifyOtp = async () => {
      try {
         const { token } = await verifyOtp(phone, otpInput);
         login(token);
         navigate(DASHBOARD_PAGE);
      } catch (err) {
         alert('Invalid OTP');
      }
   };

   return (
      <div className="login-container">
         <div className="app-name">Mediclick</div>

         <div className="login-card">
            <h2 className="login-title">Start Scheduling in Seconds</h2>

            <Input
               label="Phone Number"
               placeholder="05XXXXXXXX"
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
            />

            {otpSent ? (
               <>
                  <Input
                     label="OTP Code"
                     placeholder="Enter OTP"
                     value={otpInput}
                     onChange={(e) => setOtpInput(e.target.value)}
                  />
                  <Button
                     label="Verify OTP"
                     onClick={handleVerifyOtp}
                     disabled={!otpInput}
                  />
               </>
            ) : (
               <Button
                  label="Send OTP"
                  onClick={handleSendOtp}
                  disabled={!phone}
               />
            )}
         </div>
      </div>
   );
};

export default LoginPage;
