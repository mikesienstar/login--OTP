import { Resend } from 'resend'; // Recommended for production
import { render } from '@react-email/render';
import EmailTemplate from '@/app/api/components/emails/otp-email';

// For development/testing (in-memory storage)
const otpStore = new Map<string, { code: string; expiresAt: Date }>();

export async function sendOtp(email: string): Promise<void> {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

  // Store OTP (in production, use Redis or database)
  otpStore.set(email, { code: otp, expiresAt });

  if (process.env.NODE_ENV === 'production') {
    // Production: Send real email using Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'SAIMS <no-reply@saims.edu>',
      to: email,
      subject: 'Your SAIMS Verification Code',
      html: render(EmailTemplate({ otp })),
    });
  } else {
    // Development: Log to console
    console.log(`OTP for ${email}: ${otp}`);
  }
}

export async function verifyOtp(email: string, otp: string): Promise<boolean> {
  const storedOtp = otpStore.get(email);

  // Check if OTP exists
  if (!storedOtp) {
    throw new Error('OTP not found or expired');
  }

  // Check if expired
  if (new Date() > storedOtp.expiresAt) {
    otpStore.delete(email);
    throw new Error('OTP has expired');
  }

  // Verify code
  if (storedOtp.code !== otp) {
    throw new Error('Invalid OTP code');
  }

  // Clean up
  otpStore.delete(email);
  return true;
}

// Optional: Cleanup expired OTPs periodically
setInterval(() => {
  const now = new Date();
  for (const [email, { expiresAt }] of otpStore) {
    if (now > expiresAt) {
      otpStore.delete(email);
    }
  }
}, 60 * 60 * 1000); // Run hourly