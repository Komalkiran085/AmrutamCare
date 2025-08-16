import { useState } from "react";

interface OtpVerificationProps {
  onVerified: () => void;
  onClose: () => void;
}

const OtpVerification = ({ onVerified, onClose }: OtpVerificationProps) => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSendOtp = () => {
    if (!phone.match(/^[0-9]{10}$/)) {
      setMessage("⚠️ Please enter a valid 10-digit phone number.");
      return;
    }

    // Simulate OTP generation
    const fakeOtp = "1234";
    setGeneratedOtp(fakeOtp);
    setOtpSent(true);
    setMessage(`✅ OTP sent to ${phone}`);
    // In real project -> call backend SMS API (Twilio, Firebase, etc.)
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setMessage("🎉 OTP verified successfully!");
      setTimeout(() => {
        onVerified();
        onClose();
      }, 1000);
    } else {
      setMessage("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[320px] text-center">
        <h3 className="text-lg font-semibold mb-3">OTP Verification</h3>

        {!otpSent ? (
          <>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="border px-2 py-1 rounded w-full mb-3"
            />
            <button
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border px-2 py-1 rounded w-full mb-3"
            />
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}

        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}

        <button
          className="mt-4 text-sm text-gray-500 underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
