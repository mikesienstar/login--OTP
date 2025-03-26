// app/Dashboard/hr-manager/dashboard/page.tsx
import ProtectedLayout from '@/components/ProtectedLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function HRDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <ProtectedLayout allowedRoles={["hr-manager"]}>
      <div className="dashboard">
        <h1>HR Dashboard</h1>
        <p>Welcome, {session?.user?.name}</p>
        {/* HR-specific content */}
      </div>
    </ProtectedLayout>
  );
}