'use client';

import { useState } from 'react';
import { submitApplication } from '@/app/api/lib/api';

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    institution: '',
    // ... other fields
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await submitApplication(formData);
      if (result.success) {
        // Redirect to status page
        window.location.href = `/dashboard/student/status/${result.applicationId}`;
      } else {
        setError(result.error || 'Submission failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}