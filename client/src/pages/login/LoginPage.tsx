import { Button } from '../../components';
import { useCallback, useState } from 'react';
import { getOtp, verifyOtp } from '../../services';
import { ISRAELI_PHONE_REGEX } from '../../utils';
import { Input } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks';
import './LoginPage.less';

export const LoginPage = () => {
   const [name, setName] = useState('');
   const [phone, setPhone] = useState('');
   const [otpSent, setOtpSent] = useState(false);
   const [otpInput, setOtpInput] = useState('');
   const { login } = useAuth();
   const toast = useToast();

   const handleSendOtp = useCallback(async () => {
      if (!phone.match(ISRAELI_PHONE_REGEX)) {
         toast.error('Please enter a valid Israeli phone number.');
         return;
      }

      try {
         const response = await getOtp(phone);
         alert(`OTP: ${response.otp}`);
         setOtpSent(true);
      } catch (err) {
         alert('Failed to send OTP');
      }
   }, [phone, ISRAELI_PHONE_REGEX]);

   const handleVerifyOtp = useCallback(async () => {
      try {
         const { token } = await verifyOtp(phone, otpInput, name);
         if (!token) throw new Error('Invalid OTP');
         login(token);
      } catch (err) {
         toast.error('Invalid OTP');
      }
   }, [phone, otpInput, name]);

   return (
      <div className="login-container">
         <div className="app-name">Mediclick</div>

         <div className="login-card">
            <h2 className="login-title">Start Scheduling in Seconds</h2>

            <Input
               label="Full Name"
               placeholder="Enter your full name"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
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
                  disabled={!phone || !name}
               />
            )}
         </div>
      </div>
   );
};

export default LoginPage;
