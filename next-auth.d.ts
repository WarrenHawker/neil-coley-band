import { Role } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: number | string;
    username: string;
  }

  interface Session {
    user: {
      id: number | string;
      username: string;
    } & DefaultSession;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: number | string;
    username: string;
  }
}
