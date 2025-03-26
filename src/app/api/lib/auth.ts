import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sendOtp, verifyOtp } from './email-service';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text", optional: true }
      },
      async authorize(credentials) {
        try {
          // Step 1: Verify email/password (without OTP)
          if (!credentials?.otp) {
            const user = await verifyUserCredentials(
              credentials?.email,
              credentials?.password
            );
            
            if (!user) return null;
            
            await sendOtp(user.email);
            return { id: user.id, email: user.email, requiresOtp: true };
          }

          // Step 2: Verify OTP if provided
          const isValid = await verifyOtp(credentials.email, credentials.otp);
          if (!isValid) return null;

          // Final: Return full user after OTP verification
          return {
            id: '123',
            email: credentials.email,
            name: 'Verified User',
            role: 'student' // Set based on your DB lookup
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.requiresOtp = user.requiresOtp;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role;
      }
      if (token.requiresOtp) {
        session.requiresOtp = true;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  }
};

async function verifyUserCredentials(email?: string, password?: string) {
  // Implement your actual credential verification
  return { id: 'temp-user', email: email || '' };
}