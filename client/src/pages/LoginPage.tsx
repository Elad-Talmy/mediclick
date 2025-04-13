import { useState } from "react";
import { getOtp , verifyOtp } from "../services";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PAGE, ISRAELI_PHONE_REGEX } from "../utils";
import { Input } from "../components";

export const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phone.match(ISRAELI_PHONE_REGEX)) {
      alert("Please enter a valid Israeli phone number."); //Log to file
      return;
    }

    try {
      const otp = await getOtp(phone);
      alert(`Mock OTP: ${otp}`);
      setOtpSent(true);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { token } = await verifyOtp(phone, otpInput);
      localStorage.setItem("token", token);
      navigate(DASHBOARD_PAGE);
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Input
        type="text"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {!otpSent ? (
        <button onClick={handleSendOtp}>Send OTP</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default LoginPage;