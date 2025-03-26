export interface ApplicationFormData {
  studentId: string;
  fullName: string;
  email: string;
  institution: string;
  course: string;
  yearOfStudy: number;
  startDate: string;
  endDate: string;
  resumeUrl?: string;
  additionalInfo?: string;
}

export interface ApplicationResponse {
  success: boolean;
  applicationId?: string;
  error?: string;
  timestamp: string;
}

export interface ApplicationStatus {
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  lastUpdated: string;
  reviewerComments?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  timestamp: string;
}