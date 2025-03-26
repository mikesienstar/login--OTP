// app/sec/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'hr-manager'>('student');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        email,
        password,
        role,
        redirect: false,
      });
      
      if (result?.error) {
        setError(result.error);
      } else {
        router.push(`/dashboard/${role}`);
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
      <Link href="/sec/register">Create an account</Link>
    </div>
  );
}