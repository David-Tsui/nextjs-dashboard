import NextAuth from 'next-auth'; // Referring to the auth.ts we just created
import { authConfig } from "@/auth.config";

export const { GET, POST } = NextAuth(authConfig).handlers;
