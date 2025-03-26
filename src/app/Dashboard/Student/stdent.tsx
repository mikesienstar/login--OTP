// app/Dashboard/student/page.tsx
import ProtectedLayout from '@/app/api/components/ProtectedLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/lib/auth';

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <ProtectedLayout allowedRoles={["student"]}>
      <div className="dashboard">
        <h1>Welcome, {session?.user?.name}</h1>
        {/* Dashboard content */}
      </div>
    </ProtectedLayout>
  );
}