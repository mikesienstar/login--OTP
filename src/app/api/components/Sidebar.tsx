// app/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  role: 'student' | 'hr-manager';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  
  const studentLinks = [
    { name: "Dashboard", href: "/dashboard/student" },
    { name: "Apply", href: "/dashboard/student/apply" },
    { name: "Status", href: "/dashboard/student/status" },
    { name: "Attendance", href: "/dashboard/student/attendance" },
  ];

  const hrLinks = [
    { name: "Dashboard", href: "/dashboard/hr-manager" },
    { name: "Approved", href: "/dashboard/hr-manager/approved" },
    { name: "Rejected", href: "/dashboard/hr-manager/rejected" },
    { name: "Attendance", href: "/dashboard/hr-manager/attendance" },
  ];

  const links = role === "student" ? studentLinks : hrLinks;

  return (
    <div className="sidebar">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={pathname === link.href ? 'active' : ''}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}