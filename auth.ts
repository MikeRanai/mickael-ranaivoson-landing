import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashLoginToken } from "@/lib/auth-tokens";
import { authConfig } from "./auth.config";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name ?? undefined };
      },
    }),
    // Connexion par lien email à usage unique (recours en cas d'oubli du mot de passe)
    Credentials({
      id: "magic-token",
      name: "Lien de connexion",
      credentials: { token: {} },
      async authorize(credentials) {
        const token = credentials?.token;
        if (typeof token !== "string" || token.length < 10) return null;

        const record = await prisma.loginToken.findUnique({
          where: { tokenHash: hashLoginToken(token) },
        });
        if (!record || record.usedAt || record.expiresAt < new Date()) return null;

        const user = await prisma.user.findUnique({ where: { email: record.email } });
        if (!user) return null;

        // Usage unique : on consomme le jeton immédiatement
        await prisma.loginToken.update({
          where: { id: record.id },
          data: { usedAt: new Date() },
        });

        return { id: user.id, email: user.email, name: user.name ?? undefined };
      },
    }),
  ],
});
