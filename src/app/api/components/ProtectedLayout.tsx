'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/app/api/componets/navbar';
import Sidebar from './Sidebar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedLayout({ 
  children, 
  allowedRoles 
}: ProtectedLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/sec/login');
    } else if (allowedRoles && !allowedRoles.includes(session.user?.role as string)) {
      router.push('/unauthorized');
    }
  }, [session, status, allowedRoles, router]);

  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="layout">
      <Navbar user={session.user} />
      <div className="content-container">
        <Sidebar role={session.user?.role as 'student' | 'hr-manager'} />
        <main>{children}</main>
      </div>
    </div>
  );
}