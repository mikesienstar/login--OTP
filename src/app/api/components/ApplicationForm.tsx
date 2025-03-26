'use client';

import { useState } from 'react';
import { submitApplication } from '@/app/api/lib/';

interface FormData {
  institution: string;
  course: string;
  yearOfStudy: string;
  startDate: string;
  endDate: string;
  resume: File | null;
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    institution: '',
    course: '',
    yearOfStudy: '',
    startDate: '',
    endDate: '',
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitApplication(formData);
      // Handle success
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}