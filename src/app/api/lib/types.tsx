// app/lib/types.ts
export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: 'student' | 'hr-manager';
}

export interface Application {
  id: string;
  studentId: string;
  institution: string;
  course: string;
  yearOfStudy: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: Date;
  timeIn?: string;
  timeOut?: string;
  status: 'present' | 'absent';
}