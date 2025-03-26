'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import OTPForm from '@/components/auth/OTPForm';
import SocialLogins from '@/components/auth/SocialLogins';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'hr-manager'>('student');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || `/dashboard/${role}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // First verify credentials
      const result = await signIn('credentials', {
        email,
        password,
        role,
        redirect: false,
        callbackUrl
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Show OTP if enabled in your auth flow
      setShowOTP(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  if (showOTP) {
    return <OTPForm email={email} role={role} callbackUrl={callbackUrl} />;
  }

  return (
    <div className="auth-container">
      <h1>SAIMS Login</h1>
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>I am a</label>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value as 'student' | 'hr-manager')}
            required
          >
            <option value="student">Student</option>
            <option value="hr-manager">HR Manager</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Continue
        </button>
      </form>

      <div className="auth-footer">
        <p>Don't have an account? <a href="/auth/register">Register</a></p>
        <SocialLogins role={role} callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}