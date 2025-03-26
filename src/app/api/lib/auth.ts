import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sendOtp, verifyOtp } from './email-service';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        try {
          // Verify user credentials
          const user = await verifyCredentials(
            credentials?.email,
            credentials?.password,
            credentials?.role
          );
          
          if (!user) return null;
          
          // Send OTP (in real app, implement this)
          await sendOtp(user.email);
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
        } catch (error) {
          throw new Error('Authentication failed');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  }
};

export async function verifyOtp(email: string, otp: string) {
  // Implement OTP verification logic
  // Return user data if valid
}

export async function sendOtp(email: string) {
  // Implement OTP sending logic
}