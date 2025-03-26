import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role?: 'student' | 'hr-manager'
    } & DefaultSession['user']
  }
}