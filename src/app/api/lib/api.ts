import { ApplicationFormData, ApplicationResponse } from '@/types';

/**
 * Submits a student application
 * @param formData The application form data
 * @returns Promise containing the submission result
 */
export async function submitApplication(
  formData: ApplicationFormData
): Promise<ApplicationResponse> {
  try {
    const response = await fetch('/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApplicationResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to submit application'
    );
  }
}

/**
 * Fetches application status
 * @param applicationId The application ID
 * @returns Promise containing the status data
 */
export async function getApplicationStatus(
  applicationId: string
): Promise<ApplicationStatus> {
  const response = await fetch(`/api/apply/${applicationId}`);
  return response.json();
}

/**
 * Handles file uploads (e.g., resumes)
 * @param file The file to upload
 * @returns Promise containing the upload result
 */
export async function uploadFile(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  return response.json();
}

// Additional API functions can be added below