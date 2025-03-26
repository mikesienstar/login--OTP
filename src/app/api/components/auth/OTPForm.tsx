'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyOtp } from '@/lib/auth';

interface OTPFormProps {
  email: string;
  role: 'student' | 'hr-manager';
  callbackUrl: string;
}

export default function OTPForm({ email, role, callbackUrl }: OTPFormProps) {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const otpCode = otp.join('');
      const result = await verifyOtp(email, otpCode);
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      router.push(callbackUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify Your Email</h2>
      <p>Enter the 6-digit code sent to {email}</p>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="otp-form">
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              autoFocus={index === 0}
              required
            />
          ))}
        </div>
        
        <button type="submit" className="btn-primary">
          Verify
        </button>
      </form>
      
      <div className="otp-footer">
        {countdown > 0 ? (
          <p>Resend code in {countdown}s</p>
        ) : (
          <button 
            onClick={() => setCountdown(30)} 
            className="text-link"
          >
            Resend Code
          </button>
        )}
      </div>
    </div>
  );
}