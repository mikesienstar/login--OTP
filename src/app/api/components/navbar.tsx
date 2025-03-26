// app/components/Navbar.tsx
'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { User } from 'next-auth';

interface NavbarProps {
  user?: User;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link href="/" className="logo">
          <h1 className="text-orange">SAIMS</h1>
        </Link>
        {user && (
          <div className="nav-menu">
            <button onClick={() => signOut()} className="btn btn-secondary">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}